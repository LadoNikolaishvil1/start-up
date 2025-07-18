import React from "react";
import Card from "../../components/Card";
import { useEffect } from "react";

const Browse = ({ themeColors }) => {
  const [users, setUsers] = React.useState([]);

  const getUsers = () => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Post a user after 2 seconds when component mounts
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetch("http://localhost:3000/api/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: Date.now(),
  //         username: "auto_user_" + Date.now(),
  //         email: "auto" + Date.now() + "@example.com",
  //         password: "password123",
  //         firstName: "Auto",
  //         lastName: "User",
  //         bio: "This user was posted automatically after 2 seconds.",
  //         category: "Debug",
  //         followers: 0,
  //         interests: ["debug", "auto", "test"],
  //         location: "Internet",
  //         lookingFor: ["Testing"],
  //         profilePicture:
  //           "https://tse1.mm.bing.net/th?id=OIP.DNSbdYCjSZX5xkEj41a3YAHaHa&pid=Api&P=0&h=220",
  //         socialHandle: "@autouser",
  //         userType: "influencer",
  //         website: "https://example.com",
  //       }),
  //     })
  //       .then((res) => {
  //         if (res.ok && res.headers.get("Content-Length") !== "0") {
  //           return res.json();
  //         }
  //         return null;
  //       })
  //       .then(() => {
  //         getUsers();
  //       })
  //       .catch((err) => console.error("POST failed:", err));
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {users?.map((user) =>
              user ? (
                <Card key={user.id} user={user} themeColors={themeColors} />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
