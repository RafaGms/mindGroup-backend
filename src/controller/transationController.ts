import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface IRegisterTransactionRequest extends Request {
   body: {
      type: 'income' | 'expense';
      description: string;
      amount: number;
      userId: number;
   }
}
interface ITransationsParams {
   id: number;
}

export default {
   async registerTransaction(req: IRegisterTransactionRequest, res: Response): Promise<Response> {
      const { description, amount, type, userId } = req.body;

      if (!description || amount <= 0 || !['income', 'expense'].includes(type) || !userId) {
         return res.status(400).json({ error: 'Dados inválidos.' });
      }

      try {
         const user = await prisma.user.findUnique({
            where: { id: userId },
         });

         if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
         }

         const transaction = await prisma.transaction.create({
            data: {
               amount,
               type,
               description,
               userId,
            },
         });

         return res.status(201).json(transaction);

      } catch (error) {
         console.error('Error Creating transaction:', error);

         if (!res.headersSent) {
            return res.status(500).json({ error: 'Erro ao criar transação.' });
         }
      }
      return res.status(500).json({ error: 'Erro inesperado.' });
   },
   async getAllTransactionById(req: Request<ITransationsParams>, res: Response): Promise<Response> {
      const { id } = req.params;

      try {
         const transactions = await prisma.transaction.findMany({
            where: { userId: Number(id) },
         });
         return res.status(200).json(transactions);
      } catch (error) {
         console.error(error);
         return res.status(500).json({ error: 'Erro ao buscar lista de transações.' });
      }
   },

   async delete(req: Request<ITransationsParams>, res: Response): Promise<Response> {
      const { id } = req.params;

      try {
         await prisma.transaction.delete({
            where: { id: Number(id) }
         });

         return res.status(204).send();
      } catch (error) {
         return res.status(500).json({ error: 'Erro ao deletar Transação.' });
      }
   }
}
