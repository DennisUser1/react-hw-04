import { useState, useEffect } from "react";
import { fetchImagesBySearchValue } from "./services/searchUnsplashAPI";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./App.css";

export default function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [imageResults, setImageResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [isToastShown, setIsToastShown] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    
    useEffect(() => {
        if (!searchQuery) return;

        const fetchImagesData = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
        
                const data = await fetchImagesBySearchValue(searchQuery, currentPage);
        
                if (!data || !data.results || data.results.length == 0) {
                    iziToast.warning({
                        title: "No Results",
                        message: "Sorry, there are no images matching your search query. Please try again!",
                        position: isMobile ? "bottomCenter" : "topRight",
                        timeout: 2000,
                    });
                    setTotalResults(0); 
                } else {
                    setImageResults((prevImages) => [...prevImages, ...data.results]);
                    setTotalResults(data.total); 
                    setShowLoadMore(currentPage < data.total_pages);

                    if (!isToastShown) {
                        iziToast.success({
                            title: "Success",
                            message: `Found ${data.total} images for "${searchQuery}"`,
                            position: isMobile ? "bottomCenter" : "topRight",
                            timeout: 2000,
                        });
                        setIsToastShown(true); 
                    }
                }
            } catch {
                setIsError(true);
                iziToast.warning({
                    title: "Error",
                    message: "Something went wrong. Please try again.",
                    position: isMobile ? "bottomCenter" : "topRight",
                    timeout: 2000,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchImagesData();
    }, [searchQuery, currentPage, isMobile, isToastShown]);

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
            iziToast.warning({
                title: "Warning",
                message: "Please enter a search term.",
                position: isMobile ? "bottomCenter" : "topRight",
                timeout: 2000,
            });
            return;
        }
        setSearchQuery(query);
        setImageResults([]);
        setCurrentPage(1);
        setShowLoadMore(false);
        setSelectedImage(null);
        setIsModalOpen(false);
        setIsToastShown(false); 
    };

    const handleOpenModal = (image) => {
        if (!isModalOpen) {
          setSelectedImage(image);
          setIsModalOpen(true);
        }
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
            <ImageGallery images={imageResults} handleOpenModal={handleOpenModal} />
            {isLoading && <Loader />}
            {showLoadMore && !isLoading && <LoadMoreBtn handleMoreClick={handleMoreClick} />}
            <ImageModal
                isOpen={isModalOpen}
                image={selectedImage}
                closeModal={handleCloseModal}
            />
        </div>
    );
};