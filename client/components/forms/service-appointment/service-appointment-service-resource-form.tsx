"use client";
import { ProfileCard } from "@/components/profile-card";
import { Button } from "@/components/ui/button";

import { api } from "@/trpc/client";
import { TCreateServiceAppointmentSchema } from "@/trpc/server/routes/service_appointment/create.schema";
import { useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { generate } from "./actions";
import { readStreamableValue } from "ai/rsc";
import * as React from "react";

import { ServiceResourceComboBox } from "@/components/service-resource-combobox";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
interface ServiceAppointmentServiceResourceFormProps {
  form: UseFormReturn<TCreateServiceAppointmentSchema>;
}

export function ServiceAppointmentServiceResourceForm({
  form,
}: ServiceAppointmentServiceResourceFormProps) {
  const [value, setValue] = React.useState("");
  const [generation, setGeneration] = useState<string>("");

  const {
    fields: assignedResources,
    append: appendAssignedResource,
    remove: removeAssignedResource,
  } = useFieldArray({
    control: form.control,
    name: "service_resource",
    keyName: "fieldId",
  });

  const { data: service_resource, isFetching } =
    api.db.service_resource.get.textSearch.useQuery(
      { search: value },
      { refetchOnMount: false },
    );

  const handleSelectServiceResource = (selectedId: string) => {
    const selectedResource = service_resource?.find(
      (resource) => resource.id === selectedId,
    );
    if (selectedResource) {
      const existingIndex = assignedResources.findIndex(
        (assignedResource) => assignedResource.id === selectedId,
      );
      if (existingIndex >= 0) {
        removeAssignedResource(existingIndex);
      } else {
        appendAssignedResource({
          id: selectedResource.id,
        });
      }
    }
  };

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <ServiceResourceComboBox
        selectedValues={assignedResources.map(
          (assignedResource) => assignedResource.id,
        )}
        onSelect={handleSelectServiceResource}
        value={value}
        setValue={setValue}
        isLoading={isFetching}
        service_resource={service_resource ?? []}
      />
      <Button
        type="button"
        onClick={async () => {
          const { object } = await generate("Messages during finals week.");

          for await (const partialObject of readStreamableValue(object)) {
            if (partialObject) {
              setGeneration(
                JSON.stringify(partialObject.recommendations, null, 2),
              );
            }
          }
        }}
      >
        Generate
      </Button>

      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <pre>{generation}</pre>
        {assignedResources.map((assignedResource) => (
          <ProfileCard
            key={assignedResource.id}
            name={`${assignedResource.id}`}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                removeAssignedResource(
                  assignedResources.findIndex(
                    (r) => r.id === assignedResource.id,
                  ),
                )
              }
            >
              Remove
            </Button>
          </ProfileCard>
        ))}
      </div>
    </div>
  );
}
