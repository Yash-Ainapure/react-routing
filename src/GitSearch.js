import { useState } from "react";
import './Users.css';
import './GitSearch.css';
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
      const css=document.querySelector('.spinner-border');
      css.style.display="block";
      e.preventDefault();
      const result = await fetchUsername(userName);
      setResults([...result]);
      css.style.display="none";
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
         <h2>GitSearch demo</h2>
         <form>
            <div className="form-floating mb-3">
               <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="username" onChange={handleChange} />
               <label for="floatingInput">Username or EmailAddress </label>
            </div>
            <button type="submit" onClick={handleSubmit} id="submitBtn" className="btn btn-primary">Submit</button>
         </form>
         <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
         </div>
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