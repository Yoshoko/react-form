import { useState } from "react";
import ProfileCard from "./ProfileCard";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileUrl: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => {
      const newData = { ...prevData, [name]: updatedValue };
      validateField(name, updatedValue, newData);
      return newData;
    });
  };

  const validateField = (name, value, updatedData) => {
    let errorMessage = "";

    if ((name === "name" || name === "email") && !value.trim()) {
      errorMessage = "Le champ est obligatoire.";
    }

    if (name === "terms" && !value) {
      errorMessage = "Vous devez accepter les CGU.";
    }

    if (name === "name" && value.trim() && !/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
      errorMessage = "Le nom ne doit contenir que des lettres.";
    }

    if (
      name === "email" &&
      value.trim() &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      errorMessage = "Veuillez entrer une adresse email valide.";
    }

    if (name === "password" && value.length < 8) {
      errorMessage = "Le mot de passe doit contenir au moins 8 caractères.";
    }

    if (name === "confirmPassword" && value !== updatedData.password) {
      errorMessage = "Les mots de passe ne correspondent pas.";
    }

    if (name === "profileUrl" && value && !/^https?:\/\/.+/.test(value)) {
      errorMessage = "L'URL doit commencer par http:// ou https://.";
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors, [name]: errorMessage };
      if (!errorMessage) {
        delete newErrors[name];
      }
      validateForm(newErrors, updatedData);
      return newErrors;
    });
  };

  const validateForm = (updatedErrors, updatedData) => {
    const hasErrors = Object.values(updatedErrors).some((msg) => msg);
    const areFieldsFilled = updatedData.name.trim() && updatedData.email.trim();
    const isValid = !hasErrors && areFieldsFilled && updatedData.terms;
    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!isFormValid) return;

  const username = formData.email.split("@")[0];

  const formattedData = {
    name: formData.name,
    email: formData.email,
    profileImage: formData.profileUrl || "https://placehold.co/200x200",
    username: username,
    termsAccepted: formData.terms,
    submittedAt: new Date().toISOString(),
  };

  console.log("Données soumises :", formattedData);
  setSubmittedData(formattedData);
  setSuccessMessage("Inscription réussie ! ✅");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
};


  return (
    <>
    {successMessage && <p className="success-message">{successMessage}</p>}    
    <div className="container">
      {submittedData && <ProfileCard {...submittedData} />}

      <form className="form-container" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Confirmation du mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error-input" : ""}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <div className="form-group">
          <label>URL de l'image de profil</label>
          <input
            type="text"
            name="profileUrl"
            value={formData.profileUrl}
            onChange={handleChange}
            className={errors.profileUrl ? "error-input" : ""}
          />
          {errors.profileUrl && <p className="error-message">{errors.profileUrl}</p>}
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label>J'accepte les CGU</label>
          {errors.terms && <p className="error-message">{errors.terms}</p>}
        </div>

        <button type="submit" disabled={!isFormValid}>
          Enregistrer
        </button>
      </form>
    </div>
    </>
  );
};

export default Form;
