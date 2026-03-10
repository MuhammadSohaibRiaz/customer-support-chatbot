import Image from 'next/image';

export default function Logo({ className = "w-8 h-8", ...props }) {
    // Extract base dimensions to give to the Next Image component, defaulting to 32x32
    // We remove the width/height CSS classes from the component since Next.js Image
    // takes width and height attributes natively, and we can pass the className.
    return (
        <div className={`relative ${className}`} {...props}>
            <Image
                src="/logo.png"
                alt="SupportAI Logo"
                fill
                className="object-contain"
                unoptimized // we generated it dynamically
            />
        </div>
    );
}
