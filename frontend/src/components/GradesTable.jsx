import "@styles/Gradestable.css";

function GradesTable({ grades }) {
    return (
        <section className="bg-light p-2 grades-section">
            <div className="table-responsive" id="no-more-tables">
                <table className="table">
                    <thead>
                        <tr className="bg-color-honey">
                            <th>Materia</th>
                            <th>Fecha</th>
                            <th>Tipo de evaluacion</th>
                            <th>Calificación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((item, index) => (
                            <tr key={index}>
                                <td data-title="Materia">{item.course}</td>
                                <td data-title="Fecha">{item.date}</td>
                                <td data-title="Tipo de evaluacion">
                                    {item.obs}
                                </td>
                                <td data-title="Calificación">{item.grade}</td>
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
                {
                    grades.length == 0 ? <h3>Calificaciones no disponibles</h3>:<></>
                }
            </div>
        </section>
    );
}

export default GradesTable;
