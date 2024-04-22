import React, { useEffect, useState, useRef } from 'react';
import { Box, Card, Typography, TextField, Button } from '@mui/material'
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';
import "./TableforData.css";

const DataTable = (props) => {
    const { caption, icon, columns, rows, condition, handleDelete, handleEdit } = props
    const [filterRows, setfilterRows] = useState(rows)

    const tableRef = useRef(null);
    let initializedRef = useRef(condition); // Use a ref to track initialization state
    // console.log(initializedRef.current)
    useEffect(() => {
        setfilterRows(rows)
    }, [rows]);

    function setfilterRowss(param1) {
        let temp = rows.filter((row) => {
            return Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(param1.toLowerCase())
            );
        });
        setfilterRows(temp);
    }
    useEffect(() => {
        if (!initializedRef.current && tableRef.current) { // Check if DataTable is not already initialized
            const table = $(tableRef.current).DataTable({
                responsive: true,
                columnDefs: [
                    {
                        targets: [-2, -1],
                        orderable: false
                    }
                ],
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
                searching: false, // Disable the search bar
                // caption: caption,
            });
            // Define edit and delete button click event handlers
            $(tableRef.current).on('click', '.editBtn', function () {
                const data = table.row($(this).closest('tr')).data(); // Use closest() instead of parents()
                // console.log('Edit button clicked for row:', data);
                handleEdit(data)
            });

            $(tableRef.current).on('click', '.deleteBtn', function () {
                const data = table.row($(this).closest('tr')).data(); // Use closest() instead of parents()
                // console.log('Delete button clicked for row:', data);
                handleDelete(data)
            });

            initializedRef.current = true; // Set initialization flag
        }
    }, [columns, filterRows, rows]); // Watch for changes in columns and rows to reinitialize if needed
    // console.log(Object.keys(rows).length)
    // console.log(Object.keys(filterRows).length)
    // console.log(initializedRef.current)    // Reset flag whenever rows change
    return (
        <div style={{ width: '90%', margin: "auto" }} >
            <TextField
                label={`Search...`}
                type="search"
                size='small'
                onChange={(e) => setfilterRowss(e.target.value)}
                sx={{ width: { sx: "100%" }, }}
            />

            <table id='example' ref={tableRef} className="display nowrap" style={{ width: '100%', margin: "auto" }}>
                <thead>
                    <tr>
                        {columns.map((column, columnindex) => (
                            <th key={columnindex}>{column}</th>
                        ))}
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {/* <tbody>
                {
                    Array.isArray(rows[0]) ?
                        (rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                                <td><button className="editBtn">Edit</button></td>
                                <td><button className="deleteBtn">Delete</button></td>
                            </tr>
                        )))
                        :
                        (rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                                <td><button className="editBtn">Edit</button></td>
                                <td><button className="deleteBtn">Delete</button></td>
                            </tr>
                        )))
                }
            </tbody> */}
                <tbody>
                    {Array.isArray(filterRows) && filterRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.isArray(row) ? (
                                row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))
                            ) : (
                                Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))
                            )}
                            <td><button className="editBtn">Edit</button></td>
                            <td><button className="deleteBtn">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default DataTable;