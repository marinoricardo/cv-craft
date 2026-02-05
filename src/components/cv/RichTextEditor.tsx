import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Bold, Italic, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxChars?: number;
  showAIHint?: boolean;
  rows?: number;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  maxChars = 500,
  showAIHint = true,
  rows = 4,
}: RichTextEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const charCount = value.length;

  const insertFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleBold = () => insertFormatting('**');
  const handleItalic = () => insertFormatting('_');
  const handleList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newText = value.substring(0, lineStart) + '• ' + value.substring(lineStart);
    onChange(newText);
  };

  return (
    <div className="space-y-2">
      <div
        className={`border rounded-lg transition-all ${
          isFocused
            ? 'border-primary ring-2 ring-primary/20'
            : 'border-input hover:border-primary/50'
        }`}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30 rounded-t-lg">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={handleBold}
            title="Negrito"
          >
            <Bold className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={handleItalic}
            title="Itálico"
          >
            <Italic className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={handleList}
            title="Lista"
          >
            <List className="w-3.5 h-3.5" />
          </Button>

          {showAIHint && (
            <div className="flex-1 flex justify-end">
              <motion.button
                type="button"
                className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded-md hover:bg-primary/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Melhorar com IA</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2.5 bg-transparent text-sm resize-none focus:outline-none placeholder:text-muted-foreground"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <AnimatePresence>
          {showAIHint && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              A IA pode ajudar a melhorar o seu texto
            </motion.span>
          )}
        </AnimatePresence>
        <span className={charCount > maxChars ? 'text-destructive' : ''}>
          {charCount}/{maxChars}
        </span>
      </div>
    </div>
  );
};
