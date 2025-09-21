const Button = ({ label, onClick }) => {
    return (
        <button className="flex flex-col px-4 py-2 bg-transparent text-gray-800 rounded hover:bg-gray-100 hover:text-white transition" onClick={onClick}>
            {label}
        </button>
    );
}
export default Button;