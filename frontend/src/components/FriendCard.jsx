import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constant";

const FriendCard = ({ friend }) => {
  console.log('Friend object keys:', Object.keys(friend));
  console.log('Friend object:', friend);
  
  // Fix profile picture display
  const profilePic = friend.ProfilePic || '';
  
  // Use all possible field name variations
  const nativeLanguage = 
    friend.nativeLanguage || 
    friend.nativelanguage || 
    friend.NativeLanguage || 
    'Unknown';
    
  const learningLanguage = 
    friend.learningLanguages || 
    friend.learinglanguages || 
    friend.learningLanguage || 
    'Unknown';
  
  // Get flag codes directly from constants
  const getNativeFlag = () => {
    if (!nativeLanguage || nativeLanguage === 'Unknown') return null;
    return LANGUAGE_TO_FLAG[nativeLanguage.toLowerCase()];
  };
  
  const getLearningFlag = () => {
    if (!learningLanguage || learningLanguage === 'Unknown') return null;
    return LANGUAGE_TO_FLAG[learningLanguage.toLowerCase()];
  };
  
  const nativeFlag = getNativeFlag();
  const learningFlag = getLearningFlag();
  
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12 bg-base-300 rounded-full">
            {profilePic ? (
              <img src={profilePic} alt={friend.fullName} className="rounded-full" />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                {friend.fullName ? friend.fullName.charAt(0).toUpperCase() : '?'}
              </div>
            )}
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {nativeFlag && (
              <img 
                src={`https://flagcdn.com/24x18/${nativeFlag}.png`} 
                alt={nativeLanguage} 
                className="h-3 mr-1 inline-block" 
              />
            )}
            Native: {nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {learningFlag && (
              <img 
                src={`https://flagcdn.com/24x18/${learningFlag}.png`} 
                alt={learningLanguage} 
                className="h-3 mr-1 inline-block" 
              />
            )}
            Learning: {learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;