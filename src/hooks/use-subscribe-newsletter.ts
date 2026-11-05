import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { subscribeToNewsletterAction } from "@/lib/actions/newsletter";
import { ApiError } from "@/lib/api/api-client";
import { HTTP_STATUS } from "@/lib/constants/api";

// Turns the action's result back into an error, so React Query runs onError.
async function subscribe(email: string) {
  const result = await subscribeToNewsletterAction(email);

  if (!result.success) {
    throw new ApiError("Newsletter subscription failed", result.status);
  }
}

function getSubscribeErrorKey(error: Error) {
  if (error instanceof ApiError && error.status === HTTP_STATUS.CONFLICT) {
    return "alreadySubscribed";
  }

  return "genericError";
}

export function useSubscribeNewsletter() {
  // Translation
  const t = useTranslations("Footer");

  // Mutation
  return useMutation({
    mutationFn: subscribe,
    onSuccess: () => toast.success(t("subscribeSuccess")),
    onError: (error) => toast.error(t(getSubscribeErrorKey(error))),
  });
}
