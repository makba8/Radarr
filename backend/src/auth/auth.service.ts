import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../modules/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  async createRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30d',
    });
  }

  async register(userData: RegisterDto, res: Response) {
    try {
    if (!userData.password) {
      throw new Error('Password is missing'); // Ajoute un check de sécurité
    }
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  
    const newUser = await this.userService.create({
      ...userData,
      password: hashedPassword, // Stocke le hash au lieu du mot de passe brut
    });

    //Générer un JWT si tout est ok
    const payload: JwtPayload = { username: newUser.username, sub: newUser.id };
    const accessToken = this.createAccessToken(payload);
    const refreshToken = this.createAccessToken(payload);
    
     // Met le refreshToken dans un cookie sécurisé
     res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Empêche l'accès par JavaScript (XSS protection)
      secure:false,//  process.env.NODE_ENV === 'production', // HTTPS uniquement en prod
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
    });

    return res.status(201).json({ message: "Utilisateur créé avec succès!", accessToken });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
    
  }

  async login(loginDto: LoginDto, res: Response) {
    const { mail, password } = loginDto;
    const user = await this.userService.findByMail(mail);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials'); 
    }
  
 
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.createAccessToken(payload);
    const refreshToken = this.createAccessToken(payload);

    // Met le refreshToken dans un cookie sécurisé
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Empêche l'accès par JavaScript (XSS protection)
      secure:false,//  process.env.NODE_ENV === 'production', // HTTPS uniquement en prod
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
    });
      
    return res.status(201).json({ message: "Connexion réalisé avec succès!", accessToken });
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw new Error('User not found');
      }

      // Créer un nouveau Access Token
      const newAccessToken = this.jwtService.sign(
        { username: user.username, sub: user.id },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );

      return newAccessToken;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

    async logout(res: Response) {
      res.clearCookie('refreshToken');
      return { message: 'Logged out successfully' };
    }
}
