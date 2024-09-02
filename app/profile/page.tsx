'use client'

import { User } from "@/components/ui/User";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/Navbar"; // Import the NavBar component
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserProfileScreen() {

  // Hardcoded user data
  // const user = {
  //   name: "Nicolás",
  //   image: "/profile.png?height=96&width=96", // Replace with the path to your image
  //   stats: {
  //     questionsAsked: 27,
  //     modelExams: 3,
  //     doubtsResolved: 10,
  //   },
  // };

  type UserDataType = {
    name: string;
    image: string;
    stats: {
      questionsAsked: number;
      modelExams: number;
      doubtsResolved: number;
    };
  };

  const [user, setUser] = useState<UserDataType | null>({
    name: "Nicolás",
    image: "/profile.png?height=96&width=96", // Replace with the path to your image
    stats: {
      questionsAsked: 27,
      modelExams: 3,
      doubtsResolved: 10,
    },
  });


  const session = useSession();

  useEffect(() => {
  
    if (session.status === "authenticated" && session.data !== undefined && session.data.user !== undefined) {
      setUser({
        name: session.data.user.name as string,
        image: session.data.user.image as string,
        stats: {
          questionsAsked: 27,
          modelExams: 3,
          doubtsResolved: 10,
        },
      });
    }
  
  }, [session]);
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col justify-between">
      <header className="mb-8 flex justify-end">
        <Button onClick={() => signOut()}>Sign Out</Button>
      </header>
      <main className="flex-grow">
        <User
          name={user?.name as string}
          image={user?.image as string}
          stats={user?.stats as { questionsAsked: number; modelExams: number; doubtsResolved: number }}
        />
      </main>
      <footer>
        <NavBar /> {/* Include the NavBar at the bottom */}
      </footer>
    </div>
  );
}
