const StudentCard = () => {
  return (
    <>
      <section className="mt-10">
        <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <div className="inline-block text-white border border-blue-600 p-14 rounded-[50%] bg-blue-600 relative">
            <h2
              className="absolute text-6xl top-[50%] left-[50%]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              H
            </h2>
          </div>
          <p className="text-2xl font-bold">Habeeb Lateef</p>
          <p className="italic">Computer Science, 300L</p>
        </div>
      </section>
    </>
  );
};

export default StudentCard;
