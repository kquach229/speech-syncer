"use client";
import "regenerator-runtime/runtime";
import TextArea from "./components/inputs/TextArea";
import { ChangeEvent, useState } from "react";
import {
  FaVolumeUp,
  FaCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaStar,
} from "react-icons/fa";
import SpeechRecognitionComponent from "./components/speechRecognition/SpeechRecognitionComponent";
import FileUpload from "./components/inputs/FileUpload";
import { rtfToText } from "./utils/rtfToText";
import LinkPaste from "./components/inputs/LinkPaste";
import useTranslate from "./hooks/useTranslate";
import LanguageSelector from "./components/inputs/LanguageSelector";
import CategoryLinks from "./components/CategoryLinks";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");

  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="h-screen w-full dark:bg-darkBlue bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-neutral-200">
              Speech<span className="text-lightBlue">Syncer</span>
            </h1>
            <p className="mt-3 text-neutral-400 text-lg">
              SpeechSyncer: Bridging the gap between languages
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-4xl">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative flex flex-col border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id={"source-language"}
                    placeholder="Source Language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setSourceText(e.target.value);
                    }}
                  />
                  <div className="flex flex-col md:flex-row justify-between p-4">
                    <span className="flex space-x-2 items-center">
                      <SpeechRecognitionComponent
                        setSourceText={setSourceText}
                      />
                      <FaVolumeUp
                        size={22}
                        className="text-gray-400 cursor-pointer"
                        onClick={() => handleAudioPlayback(sourceText)}
                      />
                      <FileUpload handleFileUpload={handleFileUpload} />
                    </span>
                    <span className="text-sm text-gray-400">
                      {sourceText.length}/2000
                    </span>
                  </div>
                </div>
                <div className="relative flex flex-col border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id={"target-language"}
                    value={targetText}
                    placeholder="Target Language"
                    onChange={() => {}}
                  />
                  <div className="flex flex-col md:flex-row justify-between p-4">
                    <span className="flex space-x-2 items-center">
                      <LanguageSelector
                        languages={languages}
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                      />
                      <FaVolumeUp
                        size={22}
                        className="text-gray-400 cursor-pointer"
                        onClick={() => handleAudioPlayback(targetText)}
                      />
                      <div className="flex space-x-2 items-center">
                        <FaCopy
                          size={22}
                          className="text-gray-400 cursor-pointer"
                          onClick={handleCopyToClipboard}
                        />
                        {copied && (
                          <span className="text-xs text-green-500 ml-2">
                            Copied!
                          </span>
                        )}
                        <FaThumbsUp size={22} className="cursor-pointer" />
                        <FaThumbsDown size={22} className="cursor-pointer" />
                        <FaStar
                          className={`cursor-pointer ${
                            favorite ? "text-yellow-500" : "text-gray-400"
                          }`}
                          onClick={handleFavorite}
                          size={22}
                        />
                      </div>
                    </span>
                    <span className="text-sm text-gray-400">
                      {targetText.length}/2000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
