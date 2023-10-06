import useDataCenter from "../../context/DataCenter";
export function DeleteLesson({ isOpen, onRequestClose, handleConfirm }) {
  const { setLoading } = useDataCenter();
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-20"></div>
      )}
      <div
        className={`fixed top-[35%] left-[30%] z-30 ${isOpen ? "" : "hidden"}`}
      >
        <div className="bg-white shadow-lg rounded-3xl w-[528px] pb-5">
          <div className="pt-5 pb-3 pl-7 pr-8 flex justify-between border-b border-1">
            <p className="text-xl ">Confirmation</p>
            <button className="text-gray-500 mr-4" onClick={onRequestClose}>
              X
            </button>
          </div>
          <div className="mt-5 pl-7 pr-5">
            <p className="text-gray-700 ">
              Are you sure to delete this lesson?
            </p>
            <div className="mt-5">
              <button
                className="border-[1px] border-orange-500 text-orange-500 font-bold w-[310px] h-[60px] rounded-xl mr-5 hover:bg-orange-500 hover:text-white"
                onClick={() => {
                  setLoading(true);
                  handleConfirm();
                  setLoading(false);
                }}
              >
                Yes, I want to delete this lesson
              </button>
              <button
                className="font-bold text-white bg-blue-500 w-[142px] h-[60px] rounded-xl hover:bg-blue-600"
                onClick={onRequestClose}
              >
                No, I don't
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DeleteCourse({ isOpen2, onRequestClose2, onConfirm2 }) {
  const handleOnConfirm2 = () => {
    onConfirm2();
    onRequestClose2();
    window.location.reload();
  };
  return (
    <>
      {isOpen2 && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-20"></div>
      )}
      <div
        className={`fixed top-[35%] left-[30%] z-30 ${isOpen2 ? "" : "hidden"}`}
      >
        <div className="bg-white shadow-lg rounded-3xl w-[528px] pb-5">
          <div className="pt-5 pb-3 pl-7 pr-8 flex justify-between border-b border-1">
            <p className="text-xl ">Confirmation</p>
            <button className="text-gray-500 mr-4" onClick={onRequestClose2}>
              X
            </button>
          </div>
          <div className="mt-5 pl-7 pr-5">
            <p className="text-gray-700 ">
              Are you sure to delete this course?
            </p>
            <div className="mt-5">
              <button
                className="border-[1px] border-orange-500 text-orange-500 font-bold w-[310px] h-[60px] rounded-xl mr-5 hover:bg-orange-500 hover:text-white"
                onClick={handleOnConfirm2}
              >
                Yes, I want to delete this course
              </button>
              <button
                className="font-bold text-white bg-blue-500 w-[142px] h-[60px] rounded-xl hover:bg-blue-600"
                onClick={onRequestClose2}
              >
                No, I don't
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DeleteCourseEdit({ isOpen, onRequestClose, handleConfirm }) {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-20"></div>
      )}
      <div
        className={`fixed top-[35%] left-[30%] z-30 ${isOpen ? "" : "hidden"}`}
      >
        <div className="bg-white shadow-lg rounded-3xl w-[528px] pb-5">
          <div className="pt-5 pb-3 pl-7 pr-8 flex justify-between border-b border-1">
            <p className="text-xl ">Confirmation</p>
            <button className="text-gray-500 mr-4" onClick={onRequestClose}>
              X
            </button>
          </div>
          <div className="mt-5 pl-7 pr-5">
            <p className="text-gray-700 ">
              Are you sure to delete this course?
            </p>
            <div className="mt-5">
              <button
                className="border-[1px] border-orange-500 text-orange-500 font-bold w-[310px] h-[60px] rounded-xl mr-5 hover:bg-orange-500 hover:text-white"
                onClick={handleConfirm}
              >
                Yes, I want to delete this course
              </button>
              <button
                className="font-bold text-white bg-blue-500 w-[142px] h-[60px] rounded-xl hover:bg-blue-600"
                onClick={onRequestClose}
              >
                No, I don't
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
