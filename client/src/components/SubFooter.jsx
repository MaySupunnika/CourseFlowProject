import vector from "../assets/homepage/vector.png"
import polygon from "../assets/homepage/Polygon.png"
import { Link } from "react-router-dom"


function SubFooter() {
    return (
        <div className="bg-gradient-to-r from-indigo-500 to-sky-500 h-auto relative flex justify-between">
            <div className="flex flex-col pl-[15%] pt-[120px] pb-[170px]">
                <div className="text-white text-4xl">Interested in Becoming</div>
                <div className="text-white text-4xl mb-[40px] ">a Software Developer?</div>
                <Link to="/course">
                    <button className="text-orange-400 bg-white w-[80%] py-[20px] rounded-md font-semibold hover:bg-orange-400 hover:text-white active:bg-orange-300">Check Out Our Course</button>
                </Link>
            </div>
            <img className=" object-cover absolute right-[12%]" src={vector}></img>
            <img className="w-[40px] h-[40px] top-[100px] right-[5%] absolute" src={polygon}></img>
        </div>
    )
}

export default SubFooter