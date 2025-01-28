export default function TodoTable({ todos, editTodo, deleteTodo }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center mt-8">
                Todo List
            </h2>
            <table className="w-11/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-4 text-left">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4">#</th>
                        <th className="py-2 px-4">Title</th>
                        <th className="py-2 px-4">Description</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4">{todo.title}</td>
                            <td className="py-2 px-4">{todo.description}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => editTodo(index)}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTodo(index)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
