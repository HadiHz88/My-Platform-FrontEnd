
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Terminal as TerminalIcon, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}

export function Terminal() {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandOutputs, setCommandOutputs] = useState<CommandOutput[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Focus input when clicking anywhere in the terminal
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Scroll to bottom when new command is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandOutputs]);

  // Process command input
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newCommand = input.trim();
    const newCommandHistory = [...commandHistory, newCommand];

    setCommandHistory(newCommandHistory);
    setHistoryIndex(-1);
    processCommand(newCommand);
    setInput("");
  };

  // Handle keyboard navigation through command history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  // Process the command and generate output
  const processCommand = (cmd: string) => {
    const commandParts = cmd.split(" ");
    const command = commandParts[0].toLowerCase();
    const args = commandParts.slice(1);

    let output: React.ReactNode;
    let isError = false;

    switch (command) {
      case "help":
        output = (
          <div className="grid gap-1">
            <p>Available commands:</p>
            <ul className="list-disc pl-5">
              <li>
                <span className="text-primary">help</span> - Show this help message
              </li>
              <li>
                <span className="text-primary">clear</span> - Clear the terminal
              </li>
              <li>
                <span className="text-primary">theme</span> - Toggle between light and dark theme
              </li>
              <li>
                <span className="text-primary">echo [text]</span> - Display text
              </li>
              <li>
                <span className="text-primary">date</span> - Display current date and time
              </li>
              <li>
                <span className="text-primary">ls</span> - List available sections
              </li>
              <li>
                <span className="text-primary">cat [file]</span> - Display file content
              </li>
              <li>
                <span className="text-primary">whoami</span> - Display current user
              </li>
              <li>
                <span className="text-primary">about</span> - Show about information
              </li>
              <li>
                <span className="text-primary">skills</span> - List my skills
              </li>
              <li>
                <span className="text-primary">projects</span> - View my projects
              </li>
              <li>
                <span className="text-primary">contact</span> - Show contact info
              </li>
            </ul>
          </div>
        );
        break;

      case "clear":
        setCommandOutputs([]);
        return;

      case "theme":
        setTheme(theme === "dark" ? "light" : "dark");
        output = `Theme switched to ${theme === "dark" ? "light" : "dark"} mode.`;
        break;

      case "echo":
        output = args.join(" ") || "";
        break;

      case "date":
        output = new Date().toLocaleString();
        break;

      case "ls":
        output = (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <span className="text-primary">projects/</span>
            <span className="text-primary">courses/</span>
            <span className="text-primary">skills/</span>
            <span className="text-amber-500">resume.pdf</span>
            <span className="text-green-500">contact.md</span>
            <span className="text-purple-500">about.txt</span>
          </div>
        );
        break;

      case "cat":
        if (args[0] === "about.txt") {
          output = (
            <div className="space-y-2">
              <p>I'm a passionate software developer focusing on web technologies and software engineering.</p>
              <p>Currently pursuing a Computer Science degree while building projects with React, TypeScript, and Laravel.</p>
            </div>
          );
        } else if (args[0] === "contact.md") {
          output = (
            <div className="space-y-1">
              <p>Email: hadi@example.com</p>
              <p>GitHub: github.com/HadiHz</p>
              <p>LinkedIn: linkedin.com/in/HadiHz</p>
            </div>
          );
        } else if (args[0] === "resume.pdf") {
          output = "Opening resume.pdf... Please download it from the profile section.";
        } else {
          output = `File not found: ${args[0]}`;
          isError = true;
        }
        break;

      case "whoami":
        output = "John Developer - Full Stack Developer & CS Student";
        break;

      case "about":
        output = (
          <div className="space-y-2">
            <p>I'm a passionate software developer focusing on web technologies and software engineering.</p>
            <p>Currently pursuing a Computer Science degree while building projects with React, TypeScript, and Laravel.</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="flex flex-wrap gap-1">
            {["JavaScript", "TypeScript", "React", "Node.js", "PHP", "Laravel", "MySQL", "PostgreSQL", "HTML/CSS", "Tailwind CSS", "Git", "Docker"].map((skill, i) => (
              <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2">
            <p><span className="text-primary font-semibold">E-commerce Platform:</span> A full-featured e-commerce platform using React and Laravel.</p>
            <p><span className="text-primary font-semibold">Task Management App:</span> A task management application with drag-and-drop functionality.</p>
            <p><span className="text-primary font-semibold">Weather Dashboard:</span> A weather dashboard with forecasts for multiple locations.</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1">
            <p>Email: john@example.com</p>
            <p>GitHub: github.com/johndeveloper</p>
            <p>LinkedIn: linkedin.com/in/johndeveloper</p>
          </div>
        );
        break;

      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
        isError = true;
    }

    setCommandOutputs([...commandOutputs, { command: cmd, output, isError }]);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto border shadow-md relative overflow-hidden transition-gpu">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-secondary/50 border-b">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <TerminalIcon className="h-4 w-4" />
          Terminal
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full splash-hover"
            onClick={() => processCommand("help")}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Help</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full splash-hover"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0" onClick={focusInput}>
        <div 
          ref={terminalRef} 
          className="h-[300px] overflow-auto p-4 font-mono text-sm bg-card text-card-foreground"
        >
          {commandOutputs.length === 0 && (
            <div className="text-muted-foreground">
              <p>Welcome to John's interactive terminal.</p>
              <p>Type 'help' to see available commands.</p>
            </div>
          )}
          {commandOutputs.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-green-600 dark:text-green-400">guest@johndeveloper</span>
                <span className="text-muted-foreground">~</span>
                <span className="text-primary">$</span>
                <span>{item.command}</span>
              </div>
              <div className={cn("ml-6 mt-1", item.isError ? "text-destructive" : "")}>{item.output}</div>
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-green-600 dark:text-green-400">guest@johndeveloper</span>
            <span className="text-muted-foreground">~</span>
            <span className="text-primary">$</span>
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 h-6 min-h-6 border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export default Terminal;
