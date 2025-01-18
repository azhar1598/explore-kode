import { callPublicApi } from "@/services/apiService";
import { Badge, Card, Group, Modal, Stack, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import {
  BookmarkIcon,
  Briefcase,
  Copy,
  ExternalLink,
  Share2,
} from "lucide-react";
import React, { useState } from "react";

function StartupCard({ startup }) {
  const [jobs, setJobs] = useState([]);
  const [opened, setOpened] = useState(false);

  const showJobs = async () => {
    console.log("clicked");
    const res = await callPublicApi.get(`public/job/${startup.id}`);
    console.log("res", res);
    setJobs(res.data.jobs);
    setOpened(true);
  };

  //   const getJobs = useMutation({
  //     mutationFn: async () =>
  //       axios.get(`/job`, {startup.id}),

  //     onSuccess: async (res) => {
  //       const { data } = res;
  //       if (data.isValid) {
  //         // router.push(
  //         //   `/business/${encodeURIComponent(
  //         //     businessName.trim()
  //         //   )}?category=${encodeURIComponent(
  //         //     selectedCategory?.name
  //         //       .toLowerCase()
  //         //       .replace(/\s+/g, "")
  //         //       .replace(/&/g, "-")
  //         //   )}`
  //         // );
  //       } else {
  //         // setError(
  //         //   `Please provide a valid business in the ${selectedCategory?.name} category.`
  //         // );
  //       }
  //     },
  //     onError: (err: Error) => {
  //       console.log(err.message);
  //     },
  //   });

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Left section: Tags, Title, and Description */}
      <div className="flex-1">
        {/* Tags section */}
        <div className="flex gap-3 mb-4">
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-sm">
            {startup.type}
          </span>
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-red-500/20 via-red-400/20 to-red-500/20 text-red-300 border border-red-500/30 shadow-sm">
            {startup.stage}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300">
          {startup.title}
        </h2>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-4">
          {startup.description}
        </p>

        {/* Skills */}
        {/* <div className="flex flex-wrap gap-2 mb-4">
    {project.skills.map((skill, i) => (
      <span
        key={i}
        className="px-3 py-1.5 text-sm rounded-lg bg-purple-900/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-400 transition-colors duration-300"
      >
        {skill}
      </span>
    ))}
  </div> */}

        {/* Info grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
            <span className="text-gray-400">Category</span>
            <div className="text-gray-200 font-medium mt-1">
              {startup.category}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
            <span className="text-gray-400">Team Size</span>
            <div className="text-gray-200 font-medium mt-1">
              {startup.team_size}
            </div>
          </div>
          <div
            className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              //   e.stopPropagation();
              showJobs();
            }}
          >
            <span className="text-gray-400">Available Positions</span>
            <Group gap="xs">
              <Briefcase size={16} />
              <Text fw={500}>View Openings</Text>
            </Group>
            {/* <div className="text-gray-200 font-medium mt-1">
        {startup.team_size}
      </div> */}
          </div>
        </div>
      </div>

      {/* Right section: Actions and metadata */}
      <div className="flex-shrink-0 space-y-4">
        <div className="text-sm text-gray-400">
          Created by{" "}
          <span className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors">
            {/* {project.createdBy} */}
          </span>
        </div>
        <div className="text-sm text-gray-400">
          Posted on {dayjs(startup.created_at).format("MMMM D, YYYY")}
        </div>

        <div className="flex gap-2">
          <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
            <BookmarkIcon className="h-5 w-5" />
          </button>
          <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
            <Share2 className="h-5 w-5" />
          </button>
          {startup.website && (
            <button className="px-5 py-2.5 flex items-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300 group">
              <ExternalLink className="h-5 w-5 mr-2" />
              <span className="font-medium">Visit Website</span>
            </button>
          )}
          <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
            <Copy className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Open Positions at ${startup.title}`}
        size="xl"
        bg={"red"}
      >
        <Stack gap="md">
          {jobs?.map((job) => (
            <Card key={job.id} shadow="sm" p="lg" radius="md" withBorder>
              <Group mb="xs">
                <Text size="lg" fw={600}>
                  {job.title}
                </Text>
                <Badge
                  variant="gradient"
                  gradient={
                    job.payment_type === "PAID"
                      ? { from: "teal", to: "green" }
                      : { from: "blue", to: "cyan" }
                  }
                >
                  {job.payment_type === "PAID"
                    ? "Paid Position"
                    : "Equity Split"}
                </Badge>
              </Group>
              <Text color="gray.3" mb="md">
                {job.details}
              </Text>
              <Text size="sm" color="dimmed">
                Posted on {dayjs(job.created_at).format("MMMM D, YYYY")}
              </Text>
            </Card>
          ))}
        </Stack>
      </Modal>
    </div>
  );
}

export default StartupCard;
