import React from "react";
import Card from "../components/Card";
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

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((user) => (
              <Card key={user.id} user={user} themeColors={themeColors} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
