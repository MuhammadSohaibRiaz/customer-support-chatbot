export default function Logo({ className = "w-8 h-8", ...props }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.5186 20 9.12028 19.6052 7.89293 18.9197C5.071 19.8631 3 20 3 20C3 20 4.29828 17.6521 4.10848 16.1306C3.41113 14.8143 3 13.208 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z" fill="#6366f1" />
            <path d="M12 7A4 4 0 0 0 8 11M16 11V11.01M12 11V11.01M8 15V15.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
