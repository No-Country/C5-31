import "@styles/recentactivities.css";
import { useSelector } from "react-redux";
import CoursesCard from "./CoursesCard";
function Recentactivities() {
    const materias = useSelector((state) => state.courses);

    return (
        <section className="recent_activities mb-4">
            <h2 className="recent_activities_h2 ">Actividad Reciente</h2>
            <div className="recent_activities_container">
                {materias ? (
                    materias.map(
                        (item, index) =>
                            index < 3 && (
                                <CoursesCard
                                    name={item.courseName}
                                    image={item.image}
                                    nameProf={item.teacher.fullName}
                                    key={index}
                                    id={item._id}
                                />
                            )
                    )
                ) : (
                    <div>
                        <p> No tienes materias registradas</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Recentactivities;
