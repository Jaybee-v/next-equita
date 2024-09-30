import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rider } from "@/domain/entities/Rider";
import { Award, Mail } from "lucide-react";
import React from "react";

interface RiderCardProps {
  rider: Rider;
}

export const RiderCard = ({ rider }: RiderCardProps) => {
  return (
    <div className="absolute top-0 right-0 flex justify-center items-center p-6 min-h-[92vh] w-full lg:w-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm z-0"></div>
      <Card className="max-w-md w-full relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 -translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full translate-y-16 translate-x-16"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">Fiche cavalier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              {/* <AvatarImage src={rider.image} alt={`${rider.name} ${rider.lastname}`} /> */}
              <AvatarFallback>
                {rider.name[0]}
                {rider.lastname[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-semibold">
                {rider.name} {rider.lastname}
              </h3>
              <Badge variant="secondary" className="mt-1">
                {rider.level === 0 ? "Débutant" : `Galop ${rider.level}`}
              </Badge>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <h6 className="font-semibold text-sm">Niveau</h6>
              <p className="ml-auto">
                {rider.level === 0 ? "Débutant" : `Galop ${rider.level}`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary" />
              <h6 className="font-semibold text-sm">Email</h6>
              <p className="ml-auto">{rider.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
