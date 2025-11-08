import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  Plus,
  Code,
  Image as ImageIcon,
  FileText,
  Video,
  Music,
  AlertCircle,
  Copy,
  Download,
  Lock,
  Unlock,
} from "lucide-react";
import { ContentSection, ContentSectionType } from "@shared/api";

interface ContentSectionEditorProps {
  section: ContentSection;
  onUpdate: (section: ContentSection) => void;
  onDelete: () => void;
}

export default function ContentSectionEditor({
  section,
  onUpdate,
  onDelete,
}: ContentSectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSection, setLocalSection] = useState<ContentSection>(section);

  const handleSave = () => {
    onUpdate(localSection);
    setIsExpanded(false);
  };

  const updateProtection = (key: keyof typeof localSection.protection, value: boolean) => {
    setLocalSection({
      ...localSection,
      protection: {
        ...localSection.protection,
        [key]: value,
      },
    });
  };

  const getTypeIcon = (type: ContentSectionType) => {
    switch (type) {
      case "code":
        return <Code className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "pdf":
        return <FileText className="w-4 h-4" />;
      case "audio":
        return <Music className="w-4 h-4" />;
      case "note":
        return <AlertCircle className="w-4 h-4" />;
      case "challenge":
        return <Code className="w-4 h-4" />;
      default:
        return <Plus className="w-4 h-4" />;
    }
  };

  if (!isExpanded) {
    return (
      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-colors">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-3 flex-1 text-left"
        >
          <div className="flex-shrink-0 text-blue-600">
            {getTypeIcon(localSection.type)}
          </div>
          <div className="flex-1">
            <p className="font-medium text-slate-900">
              {localSection.order}. {localSection.title}
            </p>
            <p className="text-xs text-slate-600 capitalize">
              {localSection.type}
              {localSection.protection.requiresPurchase && " • Locked"}
            </p>
          </div>
        </button>
        <button
          onClick={onDelete}
          className="p-2 hover:bg-red-100 rounded text-red-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-900">Edit Section</h4>
        <button
          onClick={() => setIsExpanded(false)}
          className="p-1 hover:bg-slate-100 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Basic Info */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">
            Title
          </label>
          <Input
            value={localSection.title}
            onChange={(e) =>
              setLocalSection({ ...localSection, title: e.target.value })
            }
            className="h-10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">
            Type
          </label>
          <select
            value={localSection.type}
            onChange={(e) =>
              setLocalSection({
                ...localSection,
                type: e.target.value as ContentSectionType,
              })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          >
            <option value="text">Text</option>
            <option value="code">Code Block</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="pdf">PDF Document</option>
            <option value="audio">Audio File</option>
            <option value="note">Note/Warning</option>
            <option value="challenge">Challenge</option>
          </select>
        </div>
      </div>

      {/* Content Specific Editors */}
      {localSection.type === "text" && (
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">
            Content
          </label>
          <textarea
            value={localSection.content || ""}
            onChange={(e) =>
              setLocalSection({ ...localSection, content: e.target.value })
            }
            rows={6}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your text content here..."
          />
        </div>
      )}

      {localSection.type === "code" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Language
            </label>
            <select
              value={localSection.code?.language || "javascript"}
              onChange={(e) =>
                setLocalSection({
                  ...localSection,
                  code: {
                    language: e.target.value,
                    code: localSection.code?.code || "",
                    fileName: localSection.code?.fileName,
                  },
                })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="bash">Bash</option>
              <option value="sql">SQL</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="yaml">YAML</option>
              <option value="json">JSON</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Code
            </label>
            <textarea
              value={localSection.code?.code || ""}
              onChange={(e) =>
                setLocalSection({
                  ...localSection,
                  code: {
                    language: localSection.code?.language || "javascript",
                    code: e.target.value,
                    fileName: localSection.code?.fileName,
                  },
                })
              }
              rows={8}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste your code here..."
            />
          </div>
        </div>
      )}

      {localSection.type === "image" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Image URL
            </label>
            <Input
              value={localSection.media?.url || ""}
              onChange={(e) =>
                setLocalSection({
                  ...localSection,
                  media: {
                    url: e.target.value,
                    fileName: localSection.media?.fileName || "image.jpg",
                    fileSize: 0,
                    uploadedAt: new Date(),
                    type: "image",
                  },
                })
              }
              placeholder="https://example.com/image.jpg"
              className="h-10"
            />
          </div>
        </div>
      )}

      {localSection.type === "video" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Video URL
            </label>
            <Input
              value={localSection.media?.url || ""}
              onChange={(e) =>
                setLocalSection({
                  ...localSection,
                  media: {
                    url: e.target.value,
                    fileName: localSection.media?.fileName || "video.mp4",
                    fileSize: 0,
                    uploadedAt: new Date(),
                    type: "video",
                  },
                })
              }
              placeholder="https://example.com/video.mp4"
              className="h-10"
            />
          </div>
        </div>
      )}

      {localSection.type === "note" && (
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">
            Note Content
          </label>
          <textarea
            value={localSection.content || ""}
            onChange={(e) =>
              setLocalSection({ ...localSection, content: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note or warning text..."
          />
        </div>
      )}

      {localSection.type === "challenge" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Challenge Instructions
            </label>
            <textarea
              value={localSection.challenge?.instructions || ""}
              onChange={(e) =>
                setLocalSection({
                  ...localSection,
                  challenge: {
                    instructions: e.target.value,
                    sampleInput: localSection.challenge?.sampleInput,
                    expectedOutput: localSection.challenge?.expectedOutput,
                  },
                })
              }
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Protection Settings */}
      <div className="border-t border-slate-200 pt-4">
        <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          {localSection.protection.requiresPurchase ? (
            <Lock className="w-4 h-4 text-red-600" />
          ) : (
            <Unlock className="w-4 h-4 text-green-600" />
          )}
          Content Protection
        </h5>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={localSection.protection.requiresPurchase}
              onChange={(e) =>
                updateProtection("requiresPurchase", e.target.checked)
              }
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-slate-900">
              Require Purchase to View
            </span>
          </label>

          {!localSection.protection.requiresPurchase && (
            <>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSection.protection.allowCopy}
                  onChange={(e) =>
                    updateProtection("allowCopy", e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <div className="flex items-center gap-2 flex-1">
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-900">
                    Allow Copy/Paste
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSection.protection.allowDownload}
                  onChange={(e) =>
                    updateProtection("allowDownload", e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <div className="flex items-center gap-2 flex-1">
                  <Download className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-900">
                    Allow Download
                  </span>
                </div>
              </label>

              {["image", "video", "pdf"].includes(localSection.type) && (
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSection.protection.applyWatermark}
                    onChange={(e) =>
                      updateProtection("applyWatermark", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-slate-900">
                    Apply Watermark
                  </span>
                </label>
              )}
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(false)}
        >
          Cancel
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleSave}
        >
          Save Section
        </Button>
      </div>
    </div>
  );
}
