import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "rounded-lg border border-muted/30 bg-white px-4 py-2.5 text-ink placeholder:text-muted/60",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, className, ...props }: TextareaProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={inputId}
        rows={4}
        className={cn(
          "rounded-lg border border-muted/30 bg-white px-4 py-2.5 text-ink placeholder:text-muted/60",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}