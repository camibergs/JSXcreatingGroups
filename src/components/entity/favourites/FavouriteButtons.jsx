import PropTypes from 'prop-types';
import './FavouriteButtons.scss';


function FavouriteButtons({user, children, get}) {
  // Initialisation ------------------------------
  const loggedInUser = 277;
  const likeRecord = { LikerID: loggedInUser };
  // const apiURL = "http://softwarehub.uk/unibase/api"
  const apiURL = 'http://10.130.41.146:5000/api';
  const likeEndpoint = `${apiURL}/users/likes/${loggedInUser}`;
  
  // State ---------------------------------------

 
  const apiPost = async (url, likeRecord) => {
    const request = {
      method: "POST",
      body: JSON.stringify(likeRecord),
      headers: { "Content-type": "application/json" },
    };

    const response = await fetch(url, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  const putLike = async (url, likeRecord) => {
    // Build request object
    const request = {
      method: "Put",
      body: JSON.stringify(likeRecord),
      headers: { "Content-type": "application/json" },
    };

    // Call the fetch
    const response = await fetch(url, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  const deleteLike = async (url) => {
    // Build request object
    const request = {
      method: "DELETE",
    };
    // Call the fetch
    let result = null;
    const response = await fetch(url, request);
    if (response.status !== 204) result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  
  // Handlers ------------------------------------
  const handlePostLike = async (student) => {
    console.log(`you liked ${student.UserID}`);
    likeRecord.LikeeID = student.UserID;
    likeRecord.LikeAffinityID = 1;
    const result = await apiPost(likeEndpoint, likeRecord);
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };


  const handlePutLike = async (student) => {
    console.log(`you liked ${student.UserID}`);
    likeRecord.LikeeID = student.UserID;
    likeRecord.LikeAffinityID = 1;
    const result = await putLike(
      `${likeEndpoint}/${student.UserLikeID}`,
      likeRecord
    );
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };

  const handlePostDislike = async (student) => {
    console.log(`you liked ${student.UserID}`);
    likeRecord.LikeeID = student.UserID;
    likeRecord.LikeAffinityID = 2;
    const result = await apiPost(likeEndpoint, likeRecord);
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };

  const handlePutDislike = async (student) => {
    console.log(`you liked ${student.UserID}`);
    likeRecord.LikeeID = student.UserID;
    likeRecord.LikeAffinityID = 2;
    const result = await putLike(
      `${likeEndpoint}/${student.UserLikeID}`,
      likeRecord
    );
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };

  const handleReset = async (student) => {
    console.log(`you reseted ${student.UserID}`);
    console.log(`student = ${JSON.stringify(student)}`);
    const result = await deleteLike(`${likeEndpoint}/${student.UserLikeID}`);
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };
  
  // View ----------------------------------------
  const buttonPostLike = (
    <button onClick={() => handlePostLike(user)}>Like</button>
  );
  const buttonPutLike = (
    <button onClick={() => handlePutLike(user)}>Like</button>
  );
  const buttonPostDislike = (
    <button onClick={() => handlePostDislike(user)}>DisLike</button>
  );
  const buttonPutDislike = (
    <button onClick={() => handlePutDislike(user)}>DisLike</button>
  );
  const buttonReset = (
    <button onClick={() => handleReset(user)}>Reset</button>
  );

  let buttons = null;
  switch (user.UserAffinityID) {
    case 0:
      buttons = <>{buttonPostLike}
      {buttonPostDislike}</>;
      break;
    case 1:
      buttons = <>{buttonPutDislike}
      {buttonReset}</>;
      break;
    case 2:
      buttons = <>{buttonPutLike}
      {buttonReset}</>;
      break;
  }

  return (
    <div className= 'favouriteButtons'>
      {children}
      {buttons}
    </div>
  );
}
  
FavouriteButtons.propTypes = {
  user: PropTypes.shape({
    UserEmail: PropTypes.string.isRequired,
    UserFirstname: PropTypes.string.isRequired,
    UserLastname: PropTypes.string.isRequired,
    UserImageURL: PropTypes.string.isRequired,
    UserAffinityID: PropTypes.string.isRequired,
  }),
  get: PropTypes.func.isRequired,
  children: PropTypes.node,
  
};
  
export default FavouriteButtons;