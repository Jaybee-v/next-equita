"use client";
import { Link } from "@/domain/entities/Link";
import { User } from "@/domain/entities/User";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";

interface LinksTableProps {
  session: Session;
  links: Link[];
}

export const LinksTable = ({ session, links }: LinksTableProps) => {
  const [targets, setTargets] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const stablesAndTeachers: User[] = [];
      for (const link of links) {
        if (link.stableId) {
          const data = await new UserRepositoryImpl().getUserById(
            link.stableId
          );
          stablesAndTeachers.push(data);
        }
        if (link.teacherId) {
          const data = await new UserRepositoryImpl().getUserById(
            link.teacherId
          );
          stablesAndTeachers.push(data);
        }
      }
      setTargets(stablesAndTeachers);
    };
    fetchUsers();
  }, [links]);
  return (
    <div className="grid grid-cols-3 gap-4">
      {targets.map((target) => (
        <article key={target.id} className="bg-card p-6 rounded-lg shadow">
          <h2>{target.name}</h2>
          <p>{target.email}</p>
        </article>
      ))}
    </div>
  );
};
