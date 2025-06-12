import PropTypes from 'prop-types';

const Input = ({ type, name, title, value, onChange }) => {
    return (
        <div className="flex flex-col gap-2 items-start">
            <label htmlFor={name} className="text-sm">{title}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required
                autoComplete={name}
                className="w-full bg-transparent hover:outline-2 hover:outline-white focus:outline-2 focus:outline-white text-white p-2 rounded outline-1 outline-white"
            />
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Input;