"use client";

import { Input } from "@/CommonComponent/UI/Input";
import { Label } from "@/CommonComponent/UI/Label";
import apiClient from "@/utils/apiClient";
import React, { KeyboardEvent, useState } from "react";
import { toast } from "react-toastify";

export interface TeamMember {
  email: string;
  name?: string;
}

interface TeamMemberChipInputProps {
  members: TeamMember[];
  onChange: (members: TeamMember[]) => void;
  token?: string;
}

const TeamMemberChipInput: React.FC<TeamMemberChipInputProps> = ({
  members,
  onChange,
  token,
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const addMember = async () => {
    const email = emailInput.trim().toLowerCase();
    if (!email) return;

    if (members.some((member) => member.email === email)) {
      toast.info("Member already added");
      setEmailInput("");
      return;
    }

    setIsChecking(true);
    try {
      const response = await apiClient.get("user/check-email", {
        params: { email },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (response.data.exists) {
        onChange([
          ...members,
          { email: response.data.email, name: response.data.name },
        ]);
        setEmailInput("");
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("This user does not exist");
      } else {
        toast.error("Could not verify user. Try again.");
      }
    } finally {
      setIsChecking(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addMember();
    }
  };

  const removeMember = (email: string) => {
    onChange(members.filter((member) => member.email !== email));
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="team-member-email">Add Team Members</Label>
      <p className="text-xs text-neutral-400">
        Enter email and press Enter to add. Only registered users can be added.
      </p>

      <div className="flex gap-2">
        <Input
          id="team-member-email"
          type="email"
          placeholder="member@xyz.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isChecking}
        />
        <button
          type="button"
          onClick={addMember}
          disabled={isChecking || !emailInput.trim()}
          className="shrink-0 rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 disabled:opacity-50"
        >
          {isChecking ? "..." : "Add"}
        </button>
      </div>

      {members.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {members.map((member) => (
            <span
              key={member.email}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-zinc-900 px-3 py-1.5 text-sm text-white"
            >
              <span>{member.name || member.email}</span>
              {member.name && (
                <span className="text-xs text-neutral-400">({member.email})</span>
              )}
              <button
                type="button"
                onClick={() => removeMember(member.email)}
                className="text-neutral-400 hover:text-red-400"
                aria-label={`Remove ${member.email}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMemberChipInput;
