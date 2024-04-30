import React, { useState, useEffect } from 'react';
import { Table, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import fetchData from './apiService';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Button } from 'antd';


const { Option } = Select;

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: parseInt(queryString.parse(location.search).page || 1) });
    const [tagsFilter, setTagsFilter] = useState(() => {
        const queryParams = queryString.parse(location.search);
        return queryParams.tags ? queryParams.tags.split(',') : [];
    });

    const [searchText, setSearchText] = useState(() => {
        const queryParams = queryString.parse(location.search);
        return queryParams.search || '';
    });

    const pageSize = 10;

    const tagsArray = Array.from(new Set(data.flatMap(post => post.tags)));
    const filteredData = data.filter(
        (item) =>
            (!tagsFilter.length || tagsFilter.some(tag => item.tags.includes(tag))) &&
            (!searchText || item.body.toLowerCase().includes(searchText.toLowerCase()))
    );

    const fetchDataWithPagination = async (page, pageSize) => {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;
        try {
            const result = await fetchData(skip, limit);

            setData(result.posts);
            setTotal(result.total);
            console.log((pagination.current * pageSize))




        } catch (error) {
            navigate(`/NotFound`)
        }
    };


    useEffect(() => {
        const currentPage = parseInt(queryString.parse(location.search).page || 1);
        if (currentPage != pagination.current) {
            setPagination((prev) => ({ ...prev, current: currentPage }));
        }
    }, [location.search]);

    useEffect(() => {


        navigate(`?page=${pagination.current}&tags=${tagsFilter.join(',')}&search=${encodeURIComponent(searchText)}`);
        fetchDataWithPagination(pagination.current, pageSize);
    }, [pagination]);

    useEffect(() => {

        const currentPage = parseInt(queryString.parse(location.search).page || 1);
        navigate(`?page=${currentPage}&tags=${tagsFilter.join(',')}&search=${encodeURIComponent(searchText)}`);

    }, [tagsFilter, searchText]);


    const handleTagFilterChange = (value) => {

        setTagsFilter(value);

    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };


    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Title', dataIndex: 'title', key: 'title', width: '200px' },
        { title: 'Body', dataIndex: 'body', key: 'body', textWrap: 'work-break' },
        { title: 'Tags', dataIndex: 'tags', key: 'tags', render: tags => tags.join(', ') },
    ];


    return (
        <div className='Home' style={{ textAlign: 'center' }}>
            <div style={{ width: '100%', placeContent: 'center' }}>
                <h1 style={{ color: 'black' }}>Posts</h1>
                <Input.Search placeholder="Search by body" onChange={handleSearch} style={{ marginBottom: 16 }} value={searchText} />
                <Select
                    mode="multiple"
                    placeholder="Select tags"
                    onChange={handleTagFilterChange}
                    style={{ width: '100%', marginBottom: 16 }}
                    value={tagsFilter}
                >
                    {tagsArray.map(tag => (<Option value={tag} key={tag}>{tag}</Option>))}
                </Select>

                <Table
                    style={{ width: 'auto' }}
                    dataSource={filteredData}
                    columns={columns}

                    rowKey="id"
                    pagination={false}
                    size='large'
                />


            </div>
            <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <Button
                    onClick={() => setPagination({ ...pagination, current: pagination.current - 1 })}
                    disabled={pagination.current === 1} // Disable if already on the first page
                >
                    Previous Page
                </Button>
                <span style={{ margin: '0 1rem' }}>Page {pagination.current}</span>

                <Button
                    onClick={() => setPagination({ ...pagination, current: pagination.current + 1 })}
                    disabled={(pagination.current * pageSize) === total} // Disable if already on the last page
                >
                    Next Page
                </Button>
            </div>
        </div>
    );
};

export default Home;
