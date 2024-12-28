import React, { useState } from "react";
import {
  ChevronDown,
  Code,
  Globe,
  Lightbulb,
  PlusCircle,
  Sparkles,
  TypeOutline,
  Users,
  X,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import callApi from "@/services/apiService";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  Flex,
  Group,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";

const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  type: z.string().nonempty("Type is required"),
  stage: z.string().nonempty("Stage is required"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  teamSize: z.string().nonempty("Team size is required"),
  skills: z.array(z.string()).nonempty("At least one skill is required"),
});

const CreateStartup = ({ onClose }) => {
  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      title: "",
      type: "",
      stage: "",
      description: "",
      category: "",
      teamSize: "",
      website: "",
      skills: [],
    },
  });
  const [currentSkill, setCurrentSkill] = useState("");
  const [errors, setErrors] = useState({});

  console.log("formData", form.values);

  const handleSkillAdd = () => {
    // if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
    //   setFormData((prev) => ({
    //     ...prev,
    //     skills: [...prev.skills, currentSkill.trim()],
    //   }));
    //   setCurrentSkill("");
    // }
  };

  const handleSkillRemove = (skillToRemove) => {
    // setFormData((prev) => ({
    //   ...prev,
    //   skills: prev.skills.filter((skill) => skill !== skillToRemove),
    // }));
  };

  const validateForm = () => {
    const newErrors = {};
    // if (!formData.title.trim()) newErrors.title = "Title is required";
    // if (!formData.type.trim()) newErrors.type = "Type is required";
    // if (!formData.stage.trim()) newErrors.stage = "Stage is required";
    // if (!formData.description.trim())
    //   newErrors.description = "Description is required";
    // if (!formData.category.trim()) newErrors.category = "Category is required";
    // if (!formData.teamSize.trim()) newErrors.teamSize = "Team size is required";
    // if (formData.skills.length === 0)
    //   newErrors.skills = "At least one skill is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validateForm()) {
    //   onSubmit({
    //     ...formData,
    //     datePosted: new Date().toLocaleDateString(),
    //     createdBy: "Current User", // This should be replaced with actual user data
    //   });
    // }
  };

  const createStartup = useMutation({
    mutationFn: async () => callApi.post(`/startup`, formData),

    onSuccess: async (res) => {
      // const { data } = res;
      // if (data.isValid) {
      //   router.push(
      //     `/business/${encodeURIComponent(
      //       businessName.trim()
      //     )}?category=${encodeURIComponent(
      //       selectedCategory?.name
      //         .toLowerCase()
      //         .replace(/\s+/g, "")
      //         .replace(/&/g, "-")
      //     )}`
      //   );
      // } else {
      //   setError(
      //     `Please provide a valid business in the ${selectedCategory?.name} category.`
      //   );
      // }
      // console.log("data", data);
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              createStartup.mutate();
            }}
            className="space-y-5"
          >
            <Flex gap={5} direction={"column"}>
              <label
                className="block text-gray-300 text-sm font-medium"
                htmlFor="title"
              >
                Project Title
              </label>
              <Flex>
                <TextInput
                  type="text"
                  variant="create-project"
                  id="title"
                  name="title"
                  {...form.getInputProps("title")}
                  className="w-full pr-4 py-1 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                  placeholder="Enter a captivating title"
                  leftSection={<Lightbulb className=" text-gray-500" />}
                />
              </Flex>
            </Flex>

            {/* Type and Stage with enhanced select */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor="type"
                >
                  Project Type
                </label>
                <Select
                  placeholder="Pick value"
                  className="w-full  pr-4 py-1 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                  data={["React", "Angular", "Vue", "Svelte"]}
                  variant="create-project"
                  {...form.getInputProps("type")}
                  leftSection={
                    <TypeOutline className=" h-5 w-5 text-gray-500" />
                  }
                />
              </div>
              <div>
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor="stage"
                >
                  Project Stage
                </label>
                <div className="relative">
                  <Select
                    placeholder="Select stage"
                    className="w-full  pr-4 py-1 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                    data={["React", "Angular", "Vue", "Svelte"]}
                    {...form.getInputProps("stage")}
                    variant="create-project"
                    leftSection={
                      <Sparkles className=" left-4 top-3.5 h-5 w-5 text-gray-500" />
                    }
                  />
                </div>
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
              <Textarea
                id="description"
                name="description"
                rows={5}
                variant="create-project"
                {...form.getInputProps("description")}
                className="w-full  bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                placeholder="Describe your project in detail..."
              />
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

                <Select
                  placeholder="Pick value"
                  className="w-full  pr-4 py-1 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                  data={["React", "Angular", "Vue", "Svelte"]}
                  variant="create-project"
                  {...form.getInputProps("category")}
                  leftSection={
                    <Code className=" left-4 top-3.5 h-5 w-5 text-gray-500" />
                  }
                />
              </div>

              <div>
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor="teamSize"
                >
                  Team Size
                </label>
                <div className="relative">
                  <TextInput
                    type="text"
                    variant="create-project"
                    id="title"
                    name="title"
                    {...form.getInputProps("teamSize")}
                    className="w-full  pr-4 py-1 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                    placeholder="Enter a captivating title"
                    leftSection={
                      <Users className=" left-4 top-3.5 h-5 w-5 text-gray-500" />
                    }
                  />
                </div>
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
                <TextInput
                  type="url"
                  id="website"
                  variant="create-project"
                  {...form.getInputProps("website")}
                  className="w-full bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                  placeholder="https://..."
                  leftSection={
                    <Globe className=" left-4 top-3.5 h-5 w-5 text-gray-500" />
                  }
                />
              </div>
            </div>

            {/* Skills with modern tag design */}
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Skills Required
              </label>
              <div className="flex gap-3 mb-3">
                <div className="relative flex-1">
                  <TextInput
                    type="text"
                    value={currentSkill}
                    variant="create-project"
                    {...form.getInputProps("skills")}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleSkillAdd())
                    }
                    className="w-full py-1 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                    placeholder="Add required skills"
                    leftSection={
                      <Code className=" left-4 top-3.5 h-5 w-5 text-gray-500" />
                    }
                  />
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
                {form.values.skills.map((skill, index) => (
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
