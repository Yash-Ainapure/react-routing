import { useState } from "react";
import './Users.css';
function Users({ avatar, url, username }) {

   return (
      <div className="Users">
         <img src={avatar} alt="github profile" width="100px" height="100px"></img><br />
         <a href={url} target="_blank" rel="noopener noreferrer">{username}</a>
      </div>
   )
}
function GitSearch() {

   const [userName, setUsername] = useState("");
   const [results, setResults] = useState([]);

   const handleChange = (e) => {
      setUsername(e.target.value);
   }
   const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await fetchUsername(userName);
      setResults([ ...result]);
   }
   async function fetchUsername(userName) {
      try {
         const response = await fetch(`https://api.github.com/search/users?q=${userName}`);
         const json = await response.json();
         return json.items || [];

      } catch (e) {
         console.log("error catched : " + e);
      }
   }

   return (
      <div>
         GitSearch demo
         <form>
            <input type="text" name="username" onChange={handleChange}></input>
            <button onClick={handleSubmit}>Submit</button>
         </form>
         <div>
            {
               results.map(users => (
                  <Users
                     key={users.login}
                     avatar={users.avatar_url}
                     url={users.url}
                     username={users.login}
                  ></Users>
               ))
            }
         </div>
      </div>
   )
}
export default GitSearch;