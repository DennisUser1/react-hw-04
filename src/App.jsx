import { useState, useEffect } from "react";
import { fetchImagesBySearchValue } from "./services/searchUnsplashAPI";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast"; 
import "./App.css";

export default function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [imageResults, setImageResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

    useEffect(() => {
        if (!searchQuery) return;

        const fetchImagesData = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                setIsEmpty(false);

                const data = await fetchImagesBySearchValue(searchQuery, currentPage);

                if (!data || !data.results || !data.results.length) {
                    setIsEmpty(true);
                } else {
                    setImageResults((prevImages) => [...prevImages, ...data.results]);
                    setShowLoadMore(currentPage < data.total_pages);
                }
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImagesData();
    }, [searchQuery, currentPage]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMoreClick = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handleSearch = (query) => {
        if (!query.trim()) {
            if (isMobile) {
                toast.custom("Something went wrong. Please try again.", {
                    duration: 2000,
                    position: "center-center",  
                }
                 
                );
            } else {
                toast.error("Something went wrong. Please try again.", {
                    duration: 2000,
                    position: "top-right",  
                });
            }
            return;
        }
        setSearchQuery(query);
        setImageResults([]);
        setCurrentPage(1);
        setIsEmpty(false);
        setShowLoadMore(false);
    };

    const handleOpenModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            <h1>Image Finder Unsplash</h1>
            <SearchBar onSearch={handleSearch} />
            {isError && <ErrorMessage message={"Something went wrong!"} />}
            {isEmpty && (
                <ErrorMessage message={"Sorry, there are no images matching your search query. Please try again!"} />
            )}
            <ImageGallery images={imageResults} handleOpenModal={handleOpenModal} />
            {isLoading && <Loader />}
            {showLoadMore && !isLoading && <LoadMoreBtn handleMoreClick={handleMoreClick} />}
            {isModalOpen && (
                <ImageModal
                    isOpen={isModalOpen}
                    image={selectedImage}
                    closeModal={handleCloseModal}
                />
            )}
            <Toaster />
        </div>
    );
};
