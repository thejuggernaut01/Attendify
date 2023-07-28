import StudentCard from "../components/UI/StudentCard";
import SessionCard from "../components/UI/SessionCard";
import SessionDetails from "../components/UI/SessionDetails";

const Session = () => {
  return (
    <>
      <article className="mb-16">
        <StudentCard />
        <SessionCard />
        <SessionDetails />
      </article>
    </>
  );
};

export default Session;
