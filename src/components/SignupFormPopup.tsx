"use client"
import React, {useState, useEffect} from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";


interface SignupFormPopupProps {
    isVisible: boolean;
    onClose: () => void;
}

const SignupFormPopup: React.FC<SignupFormPopupProps> = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    referralname: "",
    referralemail: ""
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessMessage, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const response = await fetch('https://accredian-backend-task-c7o2.onrender.com/api/referrals', {
      const response = await fetch('http://localhost:8000/api/referrals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Referral submitted successfully and email sent");
        setShowSuccessMessage(true);
        
      } else {
        const errorData = await response.json();
        console.error("Failed to submit referral:", errorData);
      }
    } catch (error) {
      console.error("Error submitting referral:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-8 rounded shadow-lg w-1/3 relative h-[90vh]">
      {showSuccessMessage ? (
          <div className="bg-green-500 text-white p-4 rounded absolute top-4 left-4 right-4">
            Referral submitted successfully! A confirmation email has been sent.
          </div>
        ) : null}
        <button
          className="absolute top-2 right-2 text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Accredian
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Fill out the referral form below to help your friends and family unlock amazing opportunities!

        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" value={formData.firstname} onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Durden" type="text" value={formData.lastname} onChange={handleChange} />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={formData.email} onChange={handleChange} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phonenumber">Phone Number</Label>
            <Input id="phonenumber" placeholder="9191919191" type="text" value={formData.phonenumber} onChange={handleChange} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="referralname">Referral Name</Label>
            <Input id="referralname" placeholder="John Doe" type="text" value={formData.referralname} onChange={handleChange} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="referralemail">Referral Email</Label>
            <Input id="referralemail" placeholder="projectmayhem@fc.com" type="email" value={formData.referralemail} onChange={handleChange} />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Refer Now &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignupFormPopup;
