import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import prim from '../../assets/Images/prm.png'
import ViewProfile from "../../Component/BTN/ViewProfile";

const PremiumProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [sortOrder, setSortOrder] = useState("ascending");
    const navigate = useNavigate();

    // Fetch data from API
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch("http://localhost:5000/biodata");
                const data = await response.json();
                console.log(data)
                // Filter premium users
                const premiumUsers = data.filter((user) => user.status === "Premium");
                setProfiles(premiumUsers);
            } catch (error) {
                console.error("Failed to fetch biodata:", error);
            }
        };

        fetchProfiles();
    }, []);

    // Sort profiles based on age
    const sortedProfiles = [...profiles].sort((a, b) =>
        sortOrder === "ascending" ? a.age - b.age : b.age - a.age
    );

    // Handle view profile button click
    const handleViewProfile = (_id) => {
        navigate(`/profile/${_id}`);
    };

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-2xl font-bold text-center mb-5">Premium Members</h2>

            {/* Dropdown for sorting */}
            <div className="flex justify-end mb-4">
                <label htmlFor="sortOrder" className="mr-2 font-medium">
                    Sort by Age:
                </label>
                <select
                    id="sortOrder"
                    className="border border-gray-300 rounded p-2"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>

            {/* Premium Member Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProfiles.map((profile) => (
                    <div key={profile._id} className="w-full mx-auto bg-gradient-to-b from-purple-900 via-gray-900 to-black rounded-xl text-white shadow-lg p-6 relative">
                        {/* PRO Badge */}
                        <div className="absolute top-2 left-2 text-black text-xs font-bold px-2 py-1 rounded-full">
                            <img className="w-6 h-6" src={prim} alt="" />
                        </div>
                    
                        {/* Profile Picture */}
                        <div className="flex items-center space-x-4 mb-4">
                            {profile.profileImage ? (
                                <img
                                    src={profile.profileImage}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full"
                                />

                            ) : (
                                <FaUserCircle className="text-gray-500 w-20 h-20" />
                            )}

                            <div>
                                <h3 className="text-xl font-bold">{profile.name}</h3>
                                <p className="text-gray-600">{profile.type}</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-around mt-6">
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                                Premium
                            </button>

                            <div onClick={() => handleViewProfile(profile._id)} >
                                <ViewProfile></ViewProfile>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumProfiles;
