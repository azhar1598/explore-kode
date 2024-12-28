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
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { categories } from "@/constants";

const RoleSchema = z.object({
  title: z.string().nonempty("Role title is required"),
  details: z.string().nonempty("Role details are required"),
  paymentType: z.enum(["PAID", "UNPAID", "EQUITY_SPLIT"]),
});

// First, update the form schema to include the new fields
const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  type: z.string().nonempty("Type is required"),
  stage: z.string().nonempty("Stage is required"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  teamSize: z.string().nonempty("Team size is required"),
  skills: z.array(z.string()).nonempty("At least one skill is required"),
  // New fields
  role: z.string().nonempty("Role title is required"),
  roles: z.array(RoleSchema).min(1, "At least one role is required"),
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
      roles: [],
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

  const [currentRole, setCurrentRole] = useState({
    title: "",
    details: "",
    paymentType: "PAID",
  });

  // Add role to the form
  const handleAddRole = () => {
    if (currentRole.title && currentRole.details && currentRole.paymentType) {
      form.setFieldValue("roles", [...form.values.roles, { ...currentRole }]);
      // Reset current role
      setCurrentRole({
        title: "",
        details: "",
        paymentType: "PAID",
      });
    }
  };

  // Remove role from the form
  const handleRemoveRole = (index: number) => {
    form.setFieldValue(
      "roles",
      form.values.roles.filter((_, idx) => idx !== index)
    );
  };

  const createStartup = useMutation({
    mutationFn: async () => callApi.post(`/startup`, formData),

    onSuccess: async (res) => {},
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  const transformedCategories = categories.map(({ name }) => ({
    label: name,
    value: name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"),
  }));

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
            <div className="grid grid-cols-2 gap-6">
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
              <div>
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor="category"
                >
                  Category
                </label>

                <Select
                  placeholder="Select"
                  className="w-full  pr-4 py-1 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                  data={transformedCategories}
                  variant="create-project"
                  {...form.getInputProps("category")}
                  leftSection={
                    <Code className=" left-4 top-3.5 h-5 w-5 text-gray-500" />
                  }
                />
              </div>
            </div>

            {/* Type and Stage with enhanced select */}
            <div className="grid grid-cols-3 gap-6">
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
                    className="w-full  pr-4 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                    data={["React", "Angular", "Vue", "Svelte"]}
                    {...form.getInputProps("stage")}
                    variant="create-project"
                    leftSection={
                      <Sparkles className=" left-4 top-3.5 h-5 w-5 text-gray-500" />
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor="teamSize"
                >
                  Team Size
                </label>
                <div className="relative">
                  <NumberInput
                    type="text"
                    allowDecimal={false}
                    hideControls
                    variant="create-project"
                    id="title"
                    name="title"
                    {...form.getInputProps("teamSize")}
                    className="w-full  pr-4 bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                    placeholder="Enter a captivating title"
                    leftSection={
                      <Users className=" left-4 top-3.5 h-5 w-5 text-gray-500" />
                    }
                  />
                </div>
              </div>

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
                    leftSection={<Globe className=" h-5 w-5 text-gray-500" />}
                  />
                </div>
              </div>
            </div>

            {/* Description with animated focus */}
            <div className="grid grid-cols-2 gap-6">
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
                  rows={10}
                  variant="create-project"
                  {...form.getInputProps("description")}
                  className="w-full  bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                  placeholder="Describe your project in detail..."
                />
              </div>

              {/* Category and Team Size with icons */}

              <div className="space-y-4">
                <label className="block text-gray-300 text-sm font-medium">
                  Team Roles
                </label>

                {/* Role Input Form */}
                <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-gray-700">
                  <TextInput
                    placeholder="Role Title"
                    value={currentRole.title}
                    onChange={(e) =>
                      setCurrentRole((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    variant="create-project"
                    className="w-full  bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                    leftSection={<Users className="text-gray-500" />}
                  />

                  <Textarea
                    placeholder="Role Details"
                    variant="create-project"
                    value={currentRole.details}
                    className="w-full  bg-white/5 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 transition-all duration-300"
                    onChange={(e) =>
                      setCurrentRole((prev) => ({
                        ...prev,
                        details: e.target.value,
                      }))
                    }
                    rows={3}
                  />

                  <div className="flex gap-4">
                    {["PAID", "UNPAID", "EQUITY_SPLIT"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          checked={currentRole.paymentType === type}
                          onChange={() =>
                            setCurrentRole((prev) => ({
                              ...prev,
                              paymentType: type,
                            }))
                          }
                          className="form-radio text-purple-500 focus:ring-purple-500/20"
                        />
                        <span className="text-gray-300">
                          {type.replace("_", " ")}
                        </span>
                      </label>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleAddRole}
                    className="px-6 py-2 bg-purple-600/20 text-purple-400 rounded-xl hover:bg-purple-600/30 transition-all duration-300 font-medium"
                  >
                    Add Role
                  </button>
                </div>

                {/* Display Added Roles */}
                <div className="space-y-3">
                  {form.values.roles.map((role, index) => (
                    <div
                      key={index}
                      className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-purple-300 font-medium">
                            {role.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {role.details}
                          </p>
                          <span className="inline-block mt-2 px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                            {role.paymentType}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveRole(index)}
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
