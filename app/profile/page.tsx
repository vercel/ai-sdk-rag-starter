'use client'

import { User } from "@/components/ui/User";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/Navbar"; // Import the NavBar component

export default function UserProfileScreen() {
  // Hardcoded user data
  const user = {
    name: "Nicolas",
    image: "/profile.png?height=96&width=96", // Replace with the path to your image
    stats: {
      questionsAsked: 27,
      modelExams: 3,
      doubtsResolved: 10,
    },
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col justify-between">
      <header className="mb-8 flex justify-end">
        <Button onClick={() => alert("Sign out clicked")}>Sign out</Button>
      </header>
      <main className="flex-grow">
        <User
          name={user.name}
          image={user.image}
          stats={user.stats}
        />
      </main>
      <footer>
        <NavBar /> {/* Include the NavBar at the bottom */}
      </footer>
    </div>
  );
}

