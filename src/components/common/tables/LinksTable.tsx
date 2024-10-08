"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/domain/entities/Link";
import { User } from "@/domain/entities/User";
import { GetUserByIdUseCase } from "@/domain/use-cases/GetUserById.usecase";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

interface LinksTableProps {
  session: Session;
  links: Link[];
}

export const LinksTable = ({ links }: LinksTableProps) => {
  const router = useRouter();
  const [targets, setTargets] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const stablesAndTeachers: User[] = [];
      for (const link of links) {
        if (link.stableId) {
          const userRepository = new UserRepositoryImpl();
          const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
          const data = await getUserByIdUseCase.execute(link.stableId);

          stablesAndTeachers.push(data);
        }
        if (link.teacherId) {
          const userRepository = new UserRepositoryImpl();
          const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
          const data = await getUserByIdUseCase.execute(link.teacherId);

          stablesAndTeachers.push(data);
        }
      }
      setTargets(stablesAndTeachers);
    };
    fetchUsers();
  }, [links]);
  return (
    <div className="grid lg:grid-cols-3 gap-4 px-4 container">
      {targets.map((target) => (
        <Card key={target.id} className="">
          <CardHeader>
            <CardTitle>{target.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <p>{target.email}</p>
            <p className="font-semibold">
              {target.address?.zipCode} {target.address?.city}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push(`/lessons?club=${target.id}`)}>
              Voir les leçons
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
