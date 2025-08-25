// src/app/api/tampil/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    const { id } = params;
    
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`https://web-production-dbd6b.up.railway.app/teknisi/${id}`, {
      headers: {
        'Authorization': authHeader
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch data' }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    const { id } = params;
    const body = await request.json();
    
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`https://web-production-dbd6b.up.railway.app/teknisi/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to update data' }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    const { id } = params;
    
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`https://web-production-dbd6b.up.railway.app/teknisi/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': authHeader
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to delete data' }, 
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: 'Data deleted successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}