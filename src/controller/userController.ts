import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface IregisterUserRequest extends Request {
   body: {
      name: string;
      file?: Express.Multer.File;
      email: string;
      password: string;
   }
}

export default {
   async registerUser(req: IregisterUserRequest, res: Response): Promise<Response> {
      const { name, email, password } = req.body;
      const requestImage = req.file as Express.Multer.File;

      const image = {
         path: requestImage.filename,
      };

      try {
         const hashedPassword = await bcrypt.hash(password, 10);

         const user = await prisma.user.create({
            data: {
               name,
               email,
               password: hashedPassword,
               Images: {
                  create: image
               },
            },
         });

         console.log('User Created:', user); // Verifique o usuário criado

         return res.status(201).json(user);

      } catch (error) {
         console.error('Error Creating User:', error);
         return res.status(400).json({ error: 'Erro ao criar usuário.' });
      }
   }
}