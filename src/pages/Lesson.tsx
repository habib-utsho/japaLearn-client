import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Confetti from "react-confetti";
import { Button, Skeleton } from "antd";
import { useGetAllVocabulariesQuery } from "../redux/api/vocabularyApi";
import { TVocabulary } from "../types/vocabulary.type";
import { useGetSingleLessonQuery } from "../redux/api/lessonApi";

const Lesson = () => {
  const { id } = useParams();
  const [pagination, setPagination] = useState({ limit: 1, page: 1 }); // One vocabulary per page
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const navigate = useNavigate();

  const { data: lesson, isLoading: isLoadingLesson } =
    useGetSingleLessonQuery(id);
  const {
    data: vocabularies,
    isLoading: isLoadingVocabularies,
    isFetching: isFetchingVocabularies,
  } = useGetAllVocabulariesQuery([
    { name: "lessonNumber", value: id },
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
  ]);

  const handleNext = () => {
    const totalPages = vocabularies?.meta?.total;
    if (pagination.page < totalPages) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    } else {
      setIsLessonComplete(true);
    }
  };

  const handlePrevious = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handlePronunciation = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleCompleteLesson = () => {
    setIsLessonComplete(false);
    navigate("/lessons");
  };

  const currentVocabulary = vocabularies?.data?.[0] as TVocabulary;

  return (
    <div className="py-4">
      <div className="container mx-auto">
        {isLoadingLesson ? (
          <Skeleton.Button
            active
            className="!w-full !h-[400px] bg-gray-800 !rounded-lg"
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
              Lesson {id}: {lesson?.data?.name}
            </h2>
            {isLoadingVocabularies || isFetchingVocabularies ? (
              <Skeleton.Button
                active
                className="!rounded-md !bg-slate-800 !mb-4 !h-[204px] !w-full"
              />
            ) : (
              currentVocabulary && (
                <div className="p-6 rounded-md border border-slate-800">
                  <h3
                    className="text-3xl font-semibold cursor-pointer text-primary w-fit"
                    onClick={() =>
                      handlePronunciation(currentVocabulary.pronunciation)
                    }
                  >
                    {currentVocabulary.word}
                    <span className="text-sm text-gray-500 ml-2">
                      (Click to pronounce)
                    </span>
                  </h3>
                  <p>
                    <strong>Meaning:</strong> {currentVocabulary.meaning}
                  </p>
                  <p>
                    <strong>Pronunciation:</strong>{" "}
                    {currentVocabulary.pronunciation}
                  </p>
                  <p>
                    <strong>When to Say:</strong> {currentVocabulary.whenToSay}
                  </p>
                </div>
              )
            )}
            {pagination.page === vocabularies?.meta?.totalPage ? (
              <div className="text-center flex items-center gap-4">
                <Button
                  type="default"
                  onClick={handlePrevious}
                  disabled={pagination.page === 1}
                  size="large"
                  className="disabled:!text-slate-500"
                >
                  Previous
                </Button>
                <Button
                  type="primary"
                  onClick={() => setIsLessonComplete(true)}
                  size="large"
                  className="mt-4 w-2/6 md:w-3/6 lg:w-2/6 mx-auto text-center"
                >
                  Complete
                </Button>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-4">
                <Button
                  type="default"
                  onClick={handlePrevious}
                  disabled={pagination.page === 1}
                  size="large"
                  className="disabled:!text-slate-500"
                >
                  Previous
                </Button>

                <Button type="primary" onClick={handleNext} size="large">
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {isLessonComplete && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          onConfettiComplete={handleCompleteLesson}
        />
      )}
    </div>
  );
};

export default Lesson;
