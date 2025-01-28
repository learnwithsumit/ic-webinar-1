export default function TodoForm({
    onSubmit,
    formData,
    handleInputChange,
    isEditing,
}) {
    return (
        <div className="max-w-lg mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center">
                {isEditing ? "Edit Todo" : "Add Todo"}
            </h2>
            <form onSubmit={onSubmit}>
                <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="title"
                >
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter todo title"
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="description"
                >
                    Description:
                </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter todo description"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {isEditing ? "Update Todo" : "Add Todo"}
                </button>
            </form>
        </div>
    );
}
