import React, { useEffect, useState } from "react";
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

import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  Button,
  Flex,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { categories } from "@/constants";
import { createClient } from "@/utils/supabase/client";
import GoogleSignIn from "@/components/GoogleSignIn";
import { useUser } from "@/lib/providers/User/UserProvider";
import { callApi } from "@/services/apiService";

const RoleSchema = z.object({
  title: z.string().nonempty("Role title is required"),
  details: z.string().nonempty("Role details are required"),
  paymentType: z.enum(["PAID", "UNPAID", "EQUITY_SPLIT"]),
});

// First, update the form schema to include the new fields
const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  stage: z.string().nonempty("Stage is required"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  teamSize: z.string().nonempty("Team size is required"),
  role: z.string().nonempty("Role title is required"),
});

const BuildTeam = ({ onClose, user }) => {
  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      roles: [],
      startup_id: user?.startupExists?.startupId,
    },
  });

  console.log("user------>", user);

  const [currentRole, setCurrentRole] = useState({
    title: "",
    details: "",
    paymentType: "PAID",
  });

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

  const handleRemoveRole = (index: number) => {
    form.setFieldValue(
      "roles",
      form.values.roles.filter((_, idx) => idx !== index)
    );
  };

  const createStartup = useMutation({
    mutationFn: async () => callApi.post(`/job`, form.values),

    onSuccess: async (res) => {
      onClose();
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  console.log("form.values======>", form.values);

  const transformedCategories = categories.map(({ name }) => ({
    label: name,
    value: name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"),
  }));

  console.log("form.values", form.values);

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
                Build Team For Startup
              </h1>
              <p className="text-gray-400 mt-2">
                {/* Share your vision with the world */}
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
            <div className="space-y-4">
              <label className="block text-gray-300 text-sm font-medium">
                Team Roles
              </label>

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

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                onClick={onClose}
                h={40}
                className="px-6 py-3 border border-gray-700 rounded-xl text-gray-300 hover:bg-white/5 transition-all duration-300 font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                h={40}
                loading={createStartup.isPending}
                variant="create-project"
                leftSection={<PlusCircle className="h-6 w-6 text-white" />}
              >
                Publish
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuildTeam;
