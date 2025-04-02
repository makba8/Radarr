import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByMail(mail: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { mail } });
    if (!user) {
      throw new NotFoundException(`User with id ${mail} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }


  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  
    const differences = this.getDifferences(user, updateUserDto);
  
    if (differences.mail) {
      const mailTest = await this.userRepository.findOne({ where: { mail: updateUserDto.mail } });
      if (mailTest && mailTest.id !== id) {
        throw new NotFoundException(`Email ${updateUserDto.mail} already exists`);
      }
    }
  
    if (differences.username) {
      const usernameTest = await this.userRepository.findOne({ where: { username: updateUserDto.username } });
      if (usernameTest && usernameTest.id !== id) {
        throw new NotFoundException(`Username ${updateUserDto.username} already exists`);
      }
    }
  
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }
  
    // Mise à jour sécurisée des champs modifiés
    Object.assign(user, updateUserDto);
  
    return await this.userRepository.save(user);
  }
  
  

  private getDifferences(obj1: any, obj2: any): any {
    const differences: any = {};
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
        differences[key] = { oldValue: obj1[key], newValue: obj2[key] };
      }
    }
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        differences[key] = { oldValue: undefined, newValue: obj2[key] };
      }
    }
    return differences;
  }
}