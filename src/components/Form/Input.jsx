import PropTypes from 'prop-types';

const Input = ({ type, name, title, value, onChange }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm text-neutral-700">{title}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required
                autoComplete={name}
                className="bg-neutral-100 border border-neutral-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-neutral-500 transition"
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