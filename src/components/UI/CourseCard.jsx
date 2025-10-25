import { Link } from "react-router-dom";
// Using FiTrash for a modern icon, assuming you have react-icons installed
import { FiTrash2, FiUsers } from "react-icons/fi"; 

function CourseCard(props) {
  return (
    // Card Container: Dark mode, shadow, and hover effect
    <div className="w-full max-w-sm mx-auto">
      <div 
        className="flex flex-col justify-between p-6 h-auto min-h-[140px] rounded-xl 
                   bg-gray-900 text-gray-100 shadow-2xl shadow-black/50 
                   border border-gray-800 hover:border-cyan-600 transition-all duration-300"
      >
        {/* TOP ROW: Course Code & Delete Icon */}
        <div className="flex justify-between items-start mb-2">
          {/* Course Code (Highlighted) */}
          <p className="text-xl font-extrabold text-cyan-400 tracking-wider">
            {props.courseCode}
          </p>
          
          {/* Delete Button */}
          <button 
            onClick={props.onDelete} // Assuming a delete handler is passed via props
            className="p-1 text-red-400 hover:text-red-300 bg-gray-800 hover:bg-red-900/50 rounded-full transition-colors"
            aria-label={`Delete course ${props.courseCode}`}
          >
            {/* Using FiTrash2 icon */}
            <FiTrash2 size={18} />
          </button>
        </div>

        {/* MIDDLE ROW: Course Title & Lecturer */}
        <div className="space-y-1 mb-4">
          <p className="text-sm text-gray-300 font-semibold">{props.courseTitle}</p>
          <p className="text-xs text-gray-500 flex items-center space-x-1">
            <FiUsers size={12} />
            <span>{props.lecturerName || 'N/A'}</span> {/* Use lecturerName prop */}
          </p>
        </div>

        {/* BOTTOM ROW: Button & Units */}
        <div className="flex justify-between items-end border-t border-gray-800 pt-3">
          
          {/* Check Attendance Button (Primary CTA) */}
          <Link to={`/lecturer/${props.courseCode}`}>
            <button className="text-xs font-bold text-white py-2 px-4 rounded-full 
                               bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-900/50 transition-colors">
              Check Attendance
            </button>
          </Link>
          
          {/* Course Units */}
          <p className="text-sm font-bold text-gray-400">
            {props.courseUnits || props.courseUnits === 0 ? props.courseUnits : 'N/A'} Unit(s)
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;