type ButtonProps = {
  text: string;
};

function Button({ text }: ButtonProps) {
  return (
    <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition">
      {text}
    </button>
  );
}

export default Button;