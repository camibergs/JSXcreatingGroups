import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header.jsx';
import StudentNavbar from '../../components/layout/StudentNavbar.jsx';
import Action from '../UI/Actions.jsx';
import { CardContainer } from '../UI/Card.jsx';
import UserCard from '../entity/user/UserCard';
import FavouriteButtons from '../entity/favourites/FavouriteButtons.jsx';
import './Students.scss';
import ColourIndicator from '../UI/ColourIndicator.jsx';
import Searchbar from '../UI/Searchbar.jsx';
import FilterButtons from '../UI/FilterButton.jsx';


function Students() {

    // Initialisation ---------------------------
    const loggedInUser = 277;
    //const apiURL = "http://softwarehub.uk/unibase/api"
    const apiURL = 'http://10.130.41.146:5000/api';
    const myGroupEndpoint = `${apiURL}/users/likes/${loggedInUser}`;

    // State ------------------------------------
    const [students, setStudents] = useState(null);
    const [filteredStudents, setFilteredStudents] = useState(null);
  
    const apiGet = async (endpoint) => {
      const response = await fetch(endpoint);
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data); // Initialize filtered students with all students
  };

    useEffect(() => {
      apiGet(myGroupEndpoint);
    }, [myGroupEndpoint]);

    // Handlers ---------------------------------
    function searchbar(search) {
      if (search === "") {
        setFilteredStudents(students);
      } else {
        const filteredStudents = students.filter((student) => {
          return student.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredStudents(filteredStudents);
        console.log(filteredStudents);
      }
    }
    
    
    const filterStudents = (filterType) => {
      if (filterType === "Liked") {
        const likedStudents = students.filter(
          (student) => student.UserLikeAffinityID === 1
        );
        setFilteredStudents(likedStudents);
      } else if (filterType === "Disliked") {
        const dislikedStudents = students.filter(
          (student) => student.UserLikeAffinityID === 2
        );
        setFilteredStudents(dislikedStudents);
      } else {
        // "All" filter or no filter selected, show all students
        setFilteredStudents(students);
      }
    };

    // View -------------------------------------
    return (
      <>
      <Header />
      <StudentNavbar />
      <div className='studentPage' >
        <h1>Students in your course</h1>

        <Searchbar className="searchbar" searchbar={searchbar} />
        <FilterButtons onFilterChange={filterStudents} />
      
        <CardContainer>
          {!students ? (
            <p>Loading records ...</p>
          ) : students.length === 0 ? (
            <p>No records found.</p>
          ) : (
            filteredStudents.map((student, index) => (
              <ColourIndicator
                affinityID={student.UserLikeAffinityID}
                key={student.UserID}
                >
                <UserCard user={student} key={student.UserID}>
                  <FavouriteButtons user={student} index={index} get={apiGet} />
                </UserCard> 
              </ColourIndicator>
            )
        ))}
        </CardContainer>

      </div>
      </>
);
}


export default Students;