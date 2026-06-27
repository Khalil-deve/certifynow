import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackMenu() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <button
            onClick={handleGoBack}
            className="flex items-center text-gray-500 hover:text-brand-orange font-semibold mb-6 transition-colors"
        >
            <ArrowLeft size={16} className="mr-1" /> Go Back
        </button>
    )
}