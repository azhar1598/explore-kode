import React, { useState } from "react";
import {
  ChevronDown,
  Code,
  Globe,
  Lightbulb,
  PlusCircle,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const CreateStartup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    stage: "",
    description: "",
    category: "",
    teamSize: "",
    website: "",
    skills: [],
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSkillAdd = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }));
      setCurrentSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.stage.trim()) newErrors.stage = "Stage is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.teamSize.trim()) newErrors.teamSize = "Team size is required";
    if (formData.skills.length === 0)
      newErrors.skills = "At least one skill is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        datePosted: new Date().toLocaleDateString(),
        createdBy: "Current User", // This should be replaced with actual user data
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 md:px-4">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 md:rounded-2xl border border-purple-500/20 md:p-8 p-4 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-500/10">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className=" text-xl md:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-purple-400" />
                Create New Project
              </h1>
              <p className="text-gray-400 mt-2">
                Share your vision with the world
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors duration-300"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Input with icon */}
            <div className="group">
              <label
                className="block text-gray-300 mb-2 text-sm font-medium"
                htmlFor="title"
              >
                Project Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                  placeholder="Enter a captivating title"
                />
                <Lightbulb className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
              </div>
              {errors.title && (
                <p className="mt-2 text-red-400 text-sm">{errors.title}</p>
              )}
            </div>

            {/* Type and Stage with enhanced select */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor="type"
                >
                  Project Type
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-3 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 appearance-none transition-all duration-300"
                  >
                    <option value="">Select type</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Other">Other</option>
                  </select>
                  <Code className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                  <ChevronDown className="absolute right-4 top-3.5 h-5 w-5 text-gray-500" />
                </div>
                {errors.type && (
                  <p className="mt-2 text-red-400 text-sm">{errors.type}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor="stage"
                >
                  Project Stage
                </label>
                <div className="relative">
                  <select
                    id="stage"
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-3 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 appearance-none transition-all duration-300"
                  >
                    <option value="">Select stage</option>
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Testing">Testing</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <Sparkles className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                  <ChevronDown className="absolute right-4 top-3.5 h-5 w-5 text-gray-500" />
                </div>
                {errors.stage && (
                  <p className="mt-2 text-red-400 text-sm">{errors.stage}</p>
                )}
              </div>
            </div>

            {/* Description with animated focus */}
            <div>
              <label
                className="block text-gray-300 mb-2 text-sm font-medium"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                placeholder="Describe your project in detail..."
              />
              {errors.description && (
                <p className="mt-2 text-red-400 text-sm">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Category and Team Size with icons */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor="category"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-3 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 appearance-none transition-all duration-300"
                  >
                    <option value="">Select category</option>
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Desktop App">Desktop App</option>
                    <option value="API">API</option>
                    <option value="Other">Other</option>
                  </select>
                  <Code className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                  <ChevronDown className="absolute right-4 top-3.5 h-5 w-5 text-gray-500" />
                </div>
                {errors.category && (
                  <p className="mt-2 text-red-400 text-sm">{errors.category}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor="teamSize"
                >
                  Team Size
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    min="1"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                    placeholder="Enter team size"
                  />
                  <Users className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                </div>
                {errors.teamSize && (
                  <p className="mt-2 text-red-400 text-sm">{errors.teamSize}</p>
                )}
              </div>
            </div>

            {/* Website with icon */}
            <div>
              <label
                className="block text-gray-300 mb-2 text-sm font-medium"
                htmlFor="website"
              >
                Project Website (Optional)
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                  placeholder="https://..."
                />
                <Globe className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Skills with modern tag design */}
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Skills Required
              </label>
              <div className="flex gap-3 mb-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleSkillAdd())
                    }
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                    placeholder="Add required skills"
                  />
                  <Code className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                </div>
                <button
                  type="button"
                  onClick={handleSkillAdd}
                  className="px-6 py-3 bg-purple-600/20 text-purple-400 rounded-xl hover:bg-purple-600/30 transition-all duration-300 font-medium"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-500/10 text-purple-300 rounded-xl flex items-center gap-2 border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="hover:text-purple-400 transition-colors duration-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              {errors.skills && (
                <p className="mt-2 text-red-400 text-sm">{errors.skills}</p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-700 rounded-xl text-gray-300 hover:bg-white/5 transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors flex items-center gap-2"
              >
                <PlusCircle className="h-5 w-5" />
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStartup;
